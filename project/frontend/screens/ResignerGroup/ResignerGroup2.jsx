import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import React, { useState } from 'react'
import StepIndicator from 'react-native-step-indicator'

import { Picker } from '@react-native-picker/picker'
import CustomPicker from '../../components/CustomPicker'
import { AntDesign } from '@expo/vector-icons'

import Colors from '../../constants/colors'
import PrimaryButton from '../../components/PrimaryButton'
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

  const [shopName, SetShopName] = useState()
  const [address, setAddress] = useState()

  const shopInputHandler = (enterText) => {
    SetShopName(enterText)
  }
  const addressInputHandler = (enterText) => {
    setAddress(enterText)
  }

  const onPressNext = () => {
    navigation.navigate('ResignerGroup3')
  }

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen}>
        <View style={styles.screen}>
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/logo.png')} />
          </View>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={1}
            labels={labels}
            stepCount={3}
          />
          <View style={styles.group}>
            <View>
              <Text style={styles.textLabel}>店舗名</Text>
              <TextInput
                style={styles.textInput}
                keyboardType='default'
                autoCapitalize='none'
                autoCorrect={false}
                value={shopName}
                onChangeText={shopInputHandler}
                placeholder='店舗名'
              />
            </View>
            <View>
              <Text style={styles.textLabel}>住所</Text>
              <TextInput
                style={styles.textInput}
                keyboardType='default'
                autoCapitalize='none'
                autoCorrect={false}
                value={address}
                onChangeText={addressInputHandler}
                placeholder='住所'
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

  inputPassword: {
    marginBottom: 20,
  },
  textLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  textInput: {
    height: 50,
    width: 300,
    fontSize: 18,
    color: 'black',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
})
