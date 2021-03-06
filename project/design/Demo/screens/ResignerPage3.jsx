import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import StepIndicator from 'react-native-step-indicator'

import Colors from '../constants/colors'
import PrimaryButton from '../components/PrimaryButton'
import { useNavigation } from '@react-navigation/native'

import { userContext } from '../contexts/UserContext';

const labels = ['Step 1', 'Step 2', '完了']
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
  const { frequency, SetFrequency, range, SetRange } = userContext();
  const navigation = useNavigation()

  const frequencyInputHandler = (enterText) => {
    SetFrequency(enterText)
  }

  const rangeInputHandler = (enterText) => {
    SetRange(enterText)
  }

  const onPressNext = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/logo.png')} />
      </View>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={2}
        labels={labels}
        stepCount={3}
      />
      <View style={styles.group}>
        <View>
          <TextInput
            style={styles.textInput}
            keyboardType='default'
            autoCapitalize='none'
            autoCorrect={false}
            value={frequency}
            onChangeText={frequencyInputHandler}
            placeholder='通知頻度'
          />
        </View>
        <View style={styles.inputRange}>
          <TextInput
            style={styles.textInput}
            keyboardType='default'
            autoCorrect={false}
            value={range}
            onChangeText={rangeInputHandler}
            placeholder='通知範囲'
            // secureTextEntry={true}
          />
        </View>
        <PrimaryButton onPress={onPressNext}>次へ</PrimaryButton>
      </View>
    </View>
  )
}

export default ResignerPage

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
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
  textInput: {
    height: 40,
    width: 250,
    fontSize: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    color: 'black',
    marginVertical: 8,
  },
  inputRange: {
    marginBottom: 20,
  },
})
