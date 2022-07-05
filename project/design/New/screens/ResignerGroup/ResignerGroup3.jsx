import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import StepIndicator from 'react-native-step-indicator'

import Colors from '../../constants/colors'

import PrimaryButton from '../../components/PrimaryButton'
import CustomDatePicker from '../../components/CustomDatePicker'
import { useNavigation } from '@react-navigation/native'

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
  const navigation = useNavigation()

  const [email, SetEmail] = useState()
  const [password, setPassword] = useState()

  const emailInputHandler = (enterText) => {
    SetEmail(enterText)
  }

  const passwordInputHandler = (enterText) => {
    setPassword(enterText)
  }

  const onPressNext = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/logo.png')} />
      </View>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={2}
        labels={labels}
        stepCount={3}
      />
      <View style={styles.group}>
        <View style={styles.viewInput}>
          <Text style={styles.textLabel}>店舗情報</Text>
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
        <View style={styles.viewInput}>
          <Text style={styles.textLabel}>開業日</Text>
          <CustomDatePicker
            textStyle={{
              backgroundColor: '#fff',
            }}
            defaultDate={'1994-01-10'}
            onDateChange={(value) => console.log('Date changed ' + value)}
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
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 20,
  },
  textInput: {
    height: 50,
    width: 300,
    fontSize: 18,
    color: 'black',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  viewInput: {
    marginBottom: 10,
  },
  group: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
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
