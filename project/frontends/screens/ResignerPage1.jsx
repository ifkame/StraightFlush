import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Text,
  // useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import StepIndicator from 'react-native-step-indicator'

import Colors from '../constants/colors'
import PrimaryButton from '../components/PrimaryButton'
import { useNavigation } from '@react-navigation/native'

import { userContext } from '../contexts/UserContext';

const labels = ['Step 1', 'Step 2', 'Step 3']
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: Colors.line,
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: Colors.line,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: Colors.line,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: Colors.line,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: Colors.line,
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: Colors.line,
  stepIndicatorLabelFinishedColor: Colors.line,
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 16,
  currentStepLabelColor: Colors.line,
}

const ResignerPage = () => {
  const { email, SetEmail, password, SetPassword } = userContext();
  // const { width, height } = useWindowDimensions()

  const navigation = useNavigation()

  const emailInputHandler = (enterText) => {
    try {
      SetEmail(enterText)
    } catch (e) {
      console.log(`ERRORメッセージ：${e}`)
    }
  }

  const passwordInputHandler = (enterText) => {
    SetPassword(enterText)
  }

  const onPressNext = () => {
    navigation.navigate('ResignerPage2')
  }

  // const marginTopDistance = height < 380 ? 30 : 100

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior='position'>
        <View style={styles.screen}>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/logo.png')} />
          </View>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={0}
            labels={labels}
            stepCount={3}
          />
          <View style={styles.group}>
            <View style={styles.viewInput}>
              <Text style={styles.textLabel}>メールアドレス</Text>
              <TextInput
                style={styles.textInput}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                value={email}
                onChangeText={emailInputHandler}
                placeholder='メールアドレス'
              />
            </View>
            <View style={styles.inputPassword}>
              <Text style={styles.textLabel}>パスワード</Text>
              <TextInput
                style={styles.textInput}
                keyboardType='default'
                autoCorrect={false}
                value={password}
                onChangeText={passwordInputHandler}
                placeholder='パスワード'
                secureTextEntry={true}
              />
            </View>
            <PrimaryButton onPress={onPressNext}>次へ</PrimaryButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default ResignerPage

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 20,
  },
  group: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  viewInput: {
    marginBottom: 10,
  },
  textInput: {
    height: 50,
    width: 300,
    fontSize: 18,
    color: 'black',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  inputPassword: {
    marginBottom: 20,
  },
  textLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
})
