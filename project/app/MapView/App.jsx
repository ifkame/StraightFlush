import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import axios from 'axios'; //HTTP通信
import * as BackgroundFetch from 'expo-background-fetch'; //バックグラウンド
import * as TaskManager from 'expo-task-manager'; //タスクマネージャー

//タスク名
const BACKGROUND_TASK = 'background'; //バックグラウンドタスク

//API一覧
const zipcloudURL = 'https://zipcloud.ibsnet.co.jp/api/search'; // 郵便番号検索APIのURL
const foodURL = 'http://10.0.2.2:8888/stores'; //今回のアプリで使用するAPI
const CheckAPI = 'http://api.open-notify.org/iss-now.json'; //確認用API

/* タスク定義
  TaskManager.defineTask(taskName, taskExecutor)：
    taskName(string)：
      登録時にしていしたタスクの名前
    taskExecutor(TaskManagerTaskExecutor)：
      指定されたタスクが実行されたときに呼び出される関数
  注：これはグローバルスコープで呼び出す必要があります（たとえば、Reactコンポーネントの外部）
*/
TaskManager.defineTask(BACKGROUND_TASK, async () => {
	const now = Date.now();
	console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);

	/**
	 * if (now=='2022/06/26 10:') : 
	 * return TaskManager
	 */

	// 必ず成功した結果タイプを返してください！
	// BackgroundFetch.BackgroundFetchResult.NewData=2：新しいデータが正常にダウンロードされました
	return BackgroundFetch.BackgroundFetchResult.NewData;
});

//バックグラウンド成功時の設定
async function registerBackgroundFetchAsync() {
	return BackgroundFetch.registerTaskAsync(BACKGROUND_TASK, {
		minimumInterval: 1, // 1 minutes
		stopOnTerminate: true, // android only,
		startOnBoot: true // android only
	});
}

//バックグラウンド失敗時の設定
async function unregisterBackgroundFetchAsync() {
	return BackgroundFetch.unregisterTaskAsync(BACKGROUND_TASK);
}

export default function App() {
	// 郵便番号を保存しておくstate
	const [ postalCode, setPostalCode ] = useState('6650003');
	const [ address, setAddress ] = useState('');
	const [ store, setStore ] = useState('');
	const [ isRegistered, setIsRegistered ] = useState(false); //タスク状態
	const [ status, setStatus ] = useState(null); //バックグラウンド状態

	useEffect(() => {
		checkStatusAsync();
	}, []);

	useEffect(
		() => {
			console.log('郵便番号: ', postalCode, '住所: ', address);
		},
		[ address ]
	);

	useEffect(
		() => {
			//console.log('店情報: ', store);
		},
		[ store ]
	);

	// axiosのGETメソッドを使った住所検索
	const fetchAddress = async () => {
		try {
			const response = await axios.get(`${zipcloudURL}?zipcode=${postalCode}`);
			const data = response.data;
			if (!data.results) {
				return '該当する住所はありませんでした。';
			}
			switch (data.status) {
				case 200:
					// 今回はテストなので、同じ郵便番号で2件以上存在する場合は除きます
					return `${data.results[0].address1}${data.results[0].address2}${data.results[0].address3}`;
				case 400:
					return data.message;
				case 500:
					return data.message;
			}
		} catch (error) {
			return '検索失敗';
		}
	};
	// axiosのGETメソッドを使った今回のアプリで使用するAPI
	const fetchAddress2 = async () => {
		try {
			const response = await axios.get(`${foodURL}`);
			const data = response.data;
			// console.log(response);
			setStore(data);
			if (!data.results) {
				return '該当する住所はありませんでした。';
			}
			// switch (data.status) {
			// 	case 200:
			// 		// 今回はテストなので、同じ郵便番号で2件以上存在する場合は除きます
			// 		return `${data.results[0].address1}${data.results[0].address2}${data.results[0].address3}`;
			// 	case 400:
			// 		return data.message;
			// 	case 500:
			// 		return data.message;
			// }
		} catch (error) {
			return '検索失敗';
		}
	};

	// 送信ボタンを押した時に実行される関数
	async function handlePress() {
		// 7桁の数字を正規表現で置きます
		const pattern = /^[0-9]{7}$/;
		if (pattern.test(postalCode)) {
			const address = await fetchAddress();
			setAddress(address);
		} else {
			// 想定していない文字列の場合
			Alert.alert('正しい郵便番号ではありません', 'もう一度入力してください');
		}
	}

	// handlePress();
	fetchAddress2();

	//タスクとバックグラウンドが使用できるか確認する
	const checkStatusAsync = async () => {
		const status = await BackgroundFetch.getStatusAsync();
		const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK);
		setStatus(status);
		setIsRegistered(isRegistered);
	};

	//タスク, バックグラウンド状態切り替え
	const toggleFetchTask = async () => {
		if (isRegistered) {
			console.log("BackGround: OFF");
			await unregisterBackgroundFetchAsync();
		} else {
			console.log("BackGround: ON");
			await registerBackgroundFetchAsync();
		}
		checkStatusAsync();
	};

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				//場所の指定
				initialRegion={{
					latitude: 36.28825, //緯度
					longitude: 136.7324, //経度
					latitudeDelta: 1.0, //緯度の縮尺
					longitudeDelta: 1.0 //経度の縮尺
				}}
			>
				<Marker
					coordinate={option.marker.latlng} //座標(緯度、経度)
					title={option.marker.title} //ピンのタイトル
					description={option.marker.description} //説明
					onPress={toggleFetchTask} //クリック時の処理
				/>
				{/* <Marker
						draggable //移動可能
						coordinate={option.marker2.latlng} //座標
						onDragEnd={(e) => option.setState({ x: e.nativeEvent.coordinate })}
					/> */}
			</MapView>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	map: {
		width: Dimensions.get('window').width, //横の寸法取得
		height: Dimensions.get('window').height //縦の寸法取得
	}
});

const option = {
	marker: {
		title: '公園',
		discription: '遊び場',
		latlng: {
			latitude: 36.28825,
			longitude: 136.7324
		}
	},
	marker2: {
		title: '役所',
		discription: 'お役所仕事',
		latlng: {
			latitude: 36.289,
			longitude: 136.73
		}
	}
};
