import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as Permissions from 'expo-permissions';

//タスク名前
const LOCATION_TRACKING = 'location-tracking';

export default function App() {
	//非同期処理
	const startLocationTracking = async () => {
		console.log();
		//この処理が終わるまで下の処理は行わない
		await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
			accuracy: Location.Accuracy.Highest, //位置情報の精度
			timeInterval: 5000,
			distanceInterval: 0
		});
		const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TRACKING);
		console.log('tracking started?', hasStarted);
	};

	useEffect(() => {
		//初期設定
		const config = async () => {
			let res = await Permissions.askAsync(Permissions.LOCATION);
			if (res.status !== 'granted') {
				console.log('Permission to access location was denied');
			} else {
				console.log('Permission to access location granted');
			}
			requestPermissions();
		};
		//位置情報のフロントとバックグラウンドの許可
		const requestPermissions = async () => {
			const foreground = await Location.requestForegroundPermissionsAsync();
			if (foreground.granted) await Location.requestBackgroundPermissionsAsync();
		};
		config();
	}, []);

	return (
		<View style={styles.container}>
			<Button title="Start tracking" onPress={startLocationTracking} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
	if (error) {
		console.log('LOCATION_TRACKING task ERROR:', error);
		return;
	}
	if (data) {
		const { locations } = data;
		let lat = locations[0].coords.latitude;
		let long = locations[0].coords.longitude;

		console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);
	}
});
