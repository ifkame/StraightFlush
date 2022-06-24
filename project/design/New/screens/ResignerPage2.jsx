import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native'
import React, { useState } from 'react'
import StepIndicator from 'react-native-step-indicator'
import CustomDatePicker from '../components/CustomDatePicker'
import { Picker } from '@react-native-picker/picker'

import Colors from '../constants/colors'
import PrimaryButton from '../components/PrimaryButton'

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
  const [show, setShow] = useState(false)
  const [gender, setGender] = useState('男性')

  const navigation = useNavigation('ResignerPage3')

  const onPressNext = () => {
    navigation.navigate('ResignerPage3')
  }

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen}>
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
              <Text style={styles.textLabel}>生年月日</Text>
              <CustomDatePicker
                textStyle={{
                  // paddingVertical: 15,
                  // paddingHorizontal: 10,
                  // padding: 30,
                  backgroundColor: '#fff',
                }}
                defaultDate={'1994-01-10'}
                onDateChange={(value) => console.log('Date changed ' + value)}
              />
            </View>

            <View>
              <Text style={styles.textLabel}>性別</Text>
              {/* <Modal
                visible={true}
                transparent={true}
                onRequestClose={() => setShow(!show)}
                animationType='slide'
              >
                <View style={styles.modal}></View>
                <Picker
                  selectedValue={gender}
                  onValueChange={(value, index) => setGender(value)}
                  mode='dialog'
                  style={styles.picker}
                >
                  <Picker.Item label='男性' value='男性' />
                  <Picker.Item label='女性' value='女性' />
                </Picker>
              </Modal> */}
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
    width: 280,
    fontSize: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    color: 'black',
    marginVertical: 8,
  },
  inputPassword: {
    marginBottom: 20,
  },
  textLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  picker: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#000',
    backgroundColor: '#fff',
  },

  modal: {
    backgroundColor: '#fff',
    bottom: 20,
    left: 20,
    right: 20,
    position: 'absolute',
  },
})
