if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
import {decode, encode} from 'base-64';

import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Device from 'expo-device';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

//追加
import * as Notifications from 'expo-notifications';  //通知設定
import * as Location from 'expo-location';            //位置情報

//タスク名
const BACKGROUND_FETCH_TASK = 'background-notification';  //バックグラウンドの通知タスク

// 通知を受信した時の振る舞いを設定
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,  //アラート
    shouldPlaySound: false, //音
    shouldSetBadge: false,  //バッジ
  }),
});

/* タスク定義
  TaskManager.defineTask(taskName, taskExecutor)：
    taskName(string)：
      登録時にしていしたタスクの名前
    taskExecutor(TaskManagerTaskExecutor)：
      指定されたタスクが実行されたときに呼び出される関数
  注：これはグローバルスコープで呼び出す必要があります（たとえば、Reactコンポーネントの外部）
*/
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
  
  /** Location.getCurrentPositionAsync({})
   * ユーザーの現在地の1回限りの配信のリクエスト。 
   *  与えられた精度オプションによっては、特に建物の中にいる場合は、
   *  解決に時間がかかる場合があります。
   * 注：これを呼び出すと、ロケーションマネージャーはロケーション修正を取得します。
   *  これには数秒かかる場合があります。
   *  迅速な応答が期待でき、高精度が必要ない場合は、
   *  Location.getLastKnownPositionAsyncの使用を検討してください。
   */
  let location = Location.getCurrentPositionAsync({});
  console.log(location);

  // let notice = schedulePushNotification();  //通知送信
  // console.log(notice);

  // 必ず成功した結果タイプを返してください！
  // BackgroundFetch.BackgroundFetchResult.NewData=2：新しいデータが正常にダウンロードされました
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

// 今回のバックグラウンド処理の設定（成功時）
// （直訳）2.同じ名前と、バックグラウンドフェッチの動作に関するいくつかの構成オプションを指定して、アプリのある時点でタスクを登録します
// 　　　　注：これはグローバルスコープにある必要はなく、Reactコンポーネントで使用できます！
async function registerBackgroundFetchAsync() {
  /* BackgroundFetch.registerTaskAsync(taskName, options)
     taskName （string）：登録するタスクの名前
     options （BackgroundFetchOptions）：バックグラウンドフェッチオプションを含むオブジェクト。
  */
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    // バックグラウンドフェッチアラームの後続の繰り返し間の秒単位の不正確な間隔
    minimumInterval: 60 * 10,
    // ユーザーがアプリを終了した後にバックグラウンドフェッチイベントの受信を停止するかどうか
    stopOnTerminate: false, // android only,
    // デバイスの起動が終了したときにバックグラウンドフェッチイベントを再開するかどうか
    startOnBoot: true,      // android only
  });
}
// （直訳）3.（オプション）タスク名を指定してタスクの登録を解除します
// 　　　　これにより、指定された名前に一致する今後のバックグラウンドフェッチ呼び出しがキャンセルされます
// 　　　　注：これはグローバルスコープである必要はなく、Reactコンポーネントで使用できます！
// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync() {
  // バックグラウンドフェッチタスクの登録を解除して、アプリケーションがこのタスクを実行しなくなるようにします。
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export default function BackgroundFetchScreen() {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [status, setStatus] = React.useState(null);

  //通知設定追加
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    checkStatusAsync();
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    //位置情報取得
    const getLocation = async () => {
      //パーミッション(権限)の許可

      // Location.requestForegroundPermissionsAsync()
      // アプリがフォアグラウンドにあるときに、場所のアクセス許可を付与するようユーザーに求めます。
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') { //granted(承諾した)でないとき
        console.log('許可がないため位置情報を取得することはできません。');
        return;
      }

      /** Location.requestBackgroundPermissionsAsync()
       * アプリがバックグラウンドにあるときに、場所のアクセス許可を付与するようユーザーに求めます。
       * Android 11以降の場合：この方法ではシステム設定ページが開きます。
       * その前に、アプリケーションにバックグラウンドロケーション権限が必要な理由をユーザーに説明する必要があります。
       */
      let { status2 } = await Location.requestBackgroundPermissionsAsync();

      if (status2 === 'granted') {  //granted(承諾した)とき
        /** アプリがバックグラウンドにあるときにも発生する可能性のある位置情報の更新を受信するための登録
         * Location.startLocationUpdatesAsync(taskName, options)
         *  taskName(string)：場所の更新を受信するタスクの名前
         *  options(LocationTaskOptions)：ロケーションマネージャに渡されるオプションのオブジェクト
         */
        await Location.startLocationUpdatesAsync(BACKGROUND_FETCH_TASK, {
          // Accuracy：利用可能な位置精度を含む列挙型
          // Location.Accuracy.Balanced：100メートル以内の精度
          accuracy: Location.Accuracy.Balanced,
        });
      }
      /** Location.getCurrentPositionAsync({})
       * ユーザーの現在地の1回限りの配信のリクエスト。 
       *  与えられた精度オプションによっては、特に建物の中にいる場合は、
       *  解決に時間がかかる場合があります。
       * 注：これを呼び出すと、ロケーションマネージャーはロケーション修正を取得します。
       *  これには数秒かかる場合があります。
       *  迅速な応答が期待でき、高精度が必要ない場合は、
       *  Location.getLastKnownPositionAsyncの使用を検討してください。
       */
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      /** Location.getLastKnownPositionAsync(options)
       *    LocationLastKnownOptions(options):
       *      maxAge(number): 最後の既知の場所が無効になり始めて nullが返されるまでのミリ秒数
       *      requiredAccuracy(number): メートル単位で測定された、場所の不確実性の最大半径。
       *                                最後の既知の場所の精度半径が大きい（精度が低い）場合は、nullが返されます。
       * デバイスの最後の既知の位置を取得します。
       * または、デバイスnullが使用できないか、最大経過時間や必要な精度などの特定の要件に一致しない場合に取得します。
       */
      let { coords: { latitude, longitude } } = await Location.getLastKnownPositionAsync({});
      console.log("latitude: ", latitude, ", longitude:", longitude);
    };

    // getLocation();

    //通知設定の追加
    //Notifications.addNotificationReceivedListener:
    //  アプリがフォアグラウンドになっているときに通知を受信するたびに起動
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    //ユーザーが通知をタップまたは操作するたびに起動されます。
    //（アプリがフォアグラウンド、バックグラウンド、または強制終了されたときに機能します）
    //このリスナーは、ユーザーが特定の通知をタップした後、特定の画面にユーザーをルーティングする場合に特に便利です。
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const checkStatusAsync = async () => {
    // バックグラウンドフェッチのステータスを取得
    const status = await BackgroundFetch.getStatusAsync();
    /* タスクが登録されているかどうかを確認する
      TaskManager.isTaskRegisteredAsync(taskName):
        taskName(string)：タスクの名前
      注：登録されたタスクは永続ストレージに保存され、セッション間で保持されます。
    */
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }

    checkStatusAsync();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text>
          Background fetch status:{' '}
          <Text style={styles.boldText}>
            {status && BackgroundFetch.BackgroundFetchStatus[status]}
          </Text>
        </Text>
        <Text>
          Background fetch task name:{' '}
          <Text style={styles.boldText}>
            {isRegistered ? BACKGROUND_FETCH_TASK : 'Not registered yet!'}
          </Text>
        </Text>
      </View>
      <View style={styles.textContainer}></View>
      <Button
        title={isRegistered ? 'Unregister BackgroundFetch task' : 'Register BackgroundFetch task'}
        onPress={toggleFetchTask}
      />
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
}

async function schedulePushNotification() {
  return(
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    })
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {  //アプリが実際のデバイスで実行されている(Webも含む)とき
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // token = (await Notifications.getExpoPushTokenAsync()).data;
    token = (await Notifications.getDevicePushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textContainer: {
    margin: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

