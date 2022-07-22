import {
	StyleSheet,
	Text,
	View,
	Platform,
	ScrollView,
	Switch,
	Pressable,
	Alert,
	Image,
	KeyboardAvoidingView
} from 'react-native';
import React, { useState } from 'react';

import CustomPicker from '../components/CustomPicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

import Colors from '../constants/colors';
import PrimaryButton from '../components/PrimaryButton';
import { time, meter, textSize } from '../constants/data';

import Notification from '../components/Notification'

const Setting = () => {
	const [ modalTop, setModalTop ] = useState(false);
	const [ modalBottom, setModalBottom ] = useState(false);
	const [ modalText, setModalText ] = useState(false);
	const [ isEnabled, setIsEnabled ] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	const [ frequency, setFrequency ] = useState('１時間');
	const [ range, setRange ] = useState('１００m');
	const [ size, setSize ] = useState('中');

	const navigation = useNavigation();

	// PICKER OPEN
	const openPicker = () => {
		setModalTop(true);
	};

	const openPickerBottom = () => {
		setModalBottom(true);
	};
	const openPickerText = () => {
		setModalText(true);
	};

	const onPressSave = () => {
		Alert.alert('通知', '変更を完了しました。', [
			{
				text: 'OK',
				onPress: () => {
					navigation.navigate('MyPage');
				}
			}
		]);
	};
	return (
		<KeyboardAvoidingView style={{ flex: 1 }}>
			<ScrollView>
				<View style={styles.screen}>
					<View style={styles.image}>
						<Image source={require('../assets/setting.png')} style={{ width: 70, height: 70 }} />
					</View>
					<Notification />
					{/* <View style={styles.switch}>
						<Text style={styles.textLabel}>通知</Text>
						<Switch
							trackColor={{ false: '#767577', true: Colors.primary2 }}
							thumbColor="white"
							ios_backgroundColor="#333"
							onValueChange={toggleSwitch}
							value={isEnabled}
						/>
					</View> */}
					<View>
						<Text style={styles.textLabel}>再通知期間</Text>
						{Platform.OS !== 'ios' ? (
							<Picker
								selectedValue={frequency}
								onValueChange={(value, index) => setFrequency(value)}
								mode="dialog"
								style={styles.picker}
							>
								<Picker.Item label="３０分間" value="３０分間" />
								<Picker.Item label="１時間" value="１時間" />
								<Picker.Item label="２時間" value="２時間" />
							</Picker>
						) : (
							<Pressable onPress={openPicker} style={styles.inputView}>
								<Text style={styles.inputText}>{frequency}</Text>
								<AntDesign name="caretdown" size={12} color="#888" />
							</Pressable>
						)}
					</View>
					<View>
						<Text style={styles.textLabel}>通知範囲</Text>

						{Platform.OS !== 'ios' ? (
							<Picker
								selectedValue={range}
								onValueChange={(value, index) => setRange(value)}
								mode="dialog"
								style={Platform.OS !== 'ios' ? styles.picker : styles.pickerIOS}
							>
								<Picker.Item label="５０m" value="５０m" />
								<Picker.Item label="１００m" value="１００m" />
								<Picker.Item label="３００m" value="３００m" />
							</Picker>
						) : (
							<Pressable onPress={openPickerBottom} style={styles.inputView}>
								<Text style={styles.inputText}>{range}</Text>
								<AntDesign name="caretdown" size={12} color="#888" />
							</Pressable>
						)}
					</View>
					<View>
						<Text style={styles.textLabel}>文字の大きさ</Text>

						{Platform.OS !== 'ios' ? (
							<Picker
								selectedValue={size}
								onValueChange={(value, index) => setRange(value)}
								mode="dialog"
								style={Platform.OS !== 'ios' ? styles.picker : styles.pickerIOS}
							>
								<Picker.Item label="大" value="大" />
								<Picker.Item label="中" value="中" />
								<Picker.Item label="小" value="小" />
							</Picker>
						) : (
							<Pressable onPress={openPickerText} style={styles.inputView}>
								<Text style={styles.inputText}>{size}</Text>
								<AntDesign name="caretdown" size={12} color="#888" />
							</Pressable>
						)}
					</View>
					<View style={{ marginVertical: 30 }}>
						<PrimaryButton onPress={onPressSave}>変更する</PrimaryButton>
					</View>
					{modalTop &&
					Platform.OS === 'ios' && (
						<CustomPicker
							setShowModal={setModalTop}
							showModal={modalTop}
							value={frequency}
							setValue={setFrequency}
							items={time}
						/>
					)}

					{modalBottom &&
					Platform.OS === 'ios' && (
						<CustomPicker
							setShowModal={setModalBottom}
							showModal={modalBottom}
							value={range}
							setValue={setRange}
							items={meter}
						/>
					)}
					{modalText &&
					Platform.OS === 'ios' && (
						<CustomPicker
							setShowModal={setModalText}
							showModal={modalText}
							value={size}
							setValue={setSize}
							items={textSize}
						/>
					)}
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default Setting;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	image: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 30,
		backgroundColor: Colors.primary2,
		width: '100%',
		height: 170
	},
	textLabel: {
		fontSize: 16,
		fontWeight: 'bold',
		marginVertical: 10
	},
	picker: {
		width: 300,
		height: 50,
		borderWidth: 1,
		borderColor: '#fff',
		color: '#000',
		backgroundColor: '#fff'
	},
	pickerIOS: {
		width: 300,
		height: 200
	},
	inputView: {
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		width: 300,
		height: 50,
		backgroundColor: '#fff',
		padding: 10
	},
	inputText: {
		fontSize: 16
	},
	textIos: {
		color: Colors.primary,
		fontSize: 16,
		fontWeight: 'bold'
	},
	textInput: {
		height: 50,
		width: 300,
		fontSize: 18,
		color: 'black',
		backgroundColor: '#fff',
		paddingHorizontal: 10
	},
	inputPassword: {
		marginBottom: 20
	},
	switch: {
		width: '100%',
		flexDirection: 'row',
		marginTop: 80,
		justifyContent: 'space-between',
		paddingHorizontal: 46
	}
});
