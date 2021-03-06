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
  const { age, SetAge, gender, SetGender } = userContext();
  const navigation = useNavigation('ResignerPage3')

  const ageInputHandler = (enterText) => {
    SetAge(enterText)
  }

  const genderInputHandler = (enterText) => {
    SetGender(enterText)
  }

  const onPressNext = () => {
    navigation.navigate('ResignerPage3')
  }

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/logo.png')} />
      </View>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={1}
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
            value={age}
            onChangeText={ageInputHandler}
            placeholder='生年月日'
          />
        </View>
        <View style={styles.inputGender}>
          <TextInput
            style={styles.textInput}
            keyboardType='default'
            autoCorrect={false}
            value={gender}
            onChangeText={genderInputHandler}
            placeholder='性別'
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
  inputGender: {
    marginBottom: 20,
  },
})
