import {
	StyleSheet,
	Text,
	View,
	Platform,
	ScrollView,
	Pressable,
	TextInput,
	Alert,
	Image,
	KeyboardAvoidingView
} from 'react-native';
import React, { useState } from 'react';

import CustomDatePicker from '../components/CustomDatePicker';
import CustomPicker from '../components/CustomPicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';
import { sexual } from '../constants/data';
import Colors from '../constants/colors';
import PrimaryButton from '../components/PrimaryButton';

const Profile = () => {
	const [ show, setShow ] = useState(false);
	const [ gender, setGender ] = useState('女性');
	const [ email, SetEmail ] = useState();
	const [ password, setPassword ] = useState();

	const navigation = useNavigation();

	const emailInputHandler = (enterText) => {
		SetEmail(enterText);
	};

	const passwordInputHandler = (enterText) => {
		setPassword(enterText);
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
						<Image source={require('../assets/profile.png')} style={{ width: 70, height: 70 }} />
					</View>
					<View style={{ marginTop: 30 }}>
						<Text style={styles.textLabel}>生年月日</Text>
						<CustomDatePicker
							textStyle={{
								backgroundColor: '#fff'
							}}
							defaultDate={'1994-01-10'}
							onDateChange={(value) => console.log('Date changed ' + value)}
						/>
					</View>
					<View>
						<Text style={styles.textLabel}>性別</Text>
						{Platform.OS !== 'ios' ? (
							<Picker
								selectedValue={gender}
								onValueChange={(value, index) => setGender(value)}
								mode="dialog"
								style={Platform.OS !== 'ios' ? styles.picker : styles.pickerIOS}
							>
								<Picker.Item label="男性" value="男性" />
								<Picker.Item label="女性" value="女性" />
								<Picker.Item label="その他" value="その他" />
							</Picker>
						) : (
							<Pressable onPress={() => setShow(true)} style={styles.inputView}>
								<Text style={styles.inputText}>{gender}</Text>
								<AntDesign name="caretdown" size={12} color="#888" />
							</Pressable>
						)}
					</View>
					<View>
						<Text style={styles.textLabel}>メールアドレス変更</Text>
						<TextInput
							style={styles.textInput}
							keyboardType="email-address"
							autoCapitalize="none"
							autoCorrect={false}
							value={email}
							onChangeText={emailInputHandler}
							placeholder="メールアドレス"
						/>
					</View>
					<View style={styles.inputPassword}>
						<Text style={styles.textLabel}>パスワード変更</Text>
						<TextInput
							style={styles.textInput}
							keyboardType="default"
							autoCorrect={false}
							value={password}
							onChangeText={passwordInputHandler}
							placeholder="パスワード"
							secureTextEntry={true}
						/>
					</View>
					<View style={{ marginTop: 30 }}>
						<PrimaryButton onPress={onPressSave}>変更する</PrimaryButton>
					</View>
					{show &&
					Platform.OS === 'ios' && (
						<CustomPicker
							setShowModal={setShow}
							showModal={show}
							value={gender}
							setValue={setGender}
							items={sexual}
						/>
					)}
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default Profile;

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
	}
});
