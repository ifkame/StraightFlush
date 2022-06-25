import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native'
import React, { useState } from 'react'
import StepIndicator from 'react-native-step-indicator'

import Colors from '../constants/colors'
import PrimaryButton from '../components/PrimaryButton'

import { useNavigation } from '@react-navigation/native'
import { Picker, RNPickerSelect } from '@react-native-picker/picker'
import { Modal } from 'react-native-web'

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

const ResignerPage3 = () => {
  const [show, setShow] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [range, setRange] = useState('５０m')
  const [frequency, setFrequency] = useState('３０分間')

  const navigation = useNavigation()

  const onPressNext = () => {
    navigation.navigate('Login')
  }

  //Function PICKER

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen}>
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
              <Text style={styles.textLabel}>再通知期間</Text>
              {Platform.OS !== 'ios' ? (
                <Picker
                  selectedValue={frequency}
                  onValueChange={(value, index) => setFrequency(value)}
                  mode='dialog'
                  style={
                    Platform.OS !== 'ios' ? styles.picker : styles.pickerIOS
                  }
                >
                  <Picker.Item label='３０分間' value='３０分間' />
                  <Picker.Item label='１時間' value='１時間' />
                  <Picker.Item label='２時間' value='２時間' />
                </Picker>
              ) : (
                <Pressable
                  onPress={() => {
                    setModalVisible(true)
                    console.log(modalVisible)
                    setShow(true)
                  }}
                >
                  <View
                    style={{ width: 300, height: 50, backgroundColor: '#fff' }}
                  >
                    <Text>{frequency}</Text>
                  </View>
                </Pressable>
              )}
            </View>
            <View>
              <Text style={styles.textLabel}>通知範囲</Text>

              <Picker
                selectedValue={range}
                onValueChange={(value, index) => setRange(value)}
                mode='dialog'
                style={Platform.OS !== 'ios' ? styles.picker : styles.pickers}
              >
                <Picker.Item label='５０m' value='５０m' />
                <Picker.Item label='１００m' value='１００m' />
                <Picker.Item label='３００m' value='３００m' />
              </Picker>
            </View>
            <PrimaryButton onPress={onPressNext}>次へ</PrimaryButton>
            {modalVisible && Platform.OS === 'ios' && (
              <Modal
                // transparent={true}
                animationType='slide'
                visible={show}
                onRequestClose={() => setShow(false)}
              >
                <View>
                  <Picker
                    seleictedValue={frequency}
                    onValueChange={(value, index) => setFrequency(value)}
                    mode='dialog'
                    style={
                      Platform.OS !== 'ios' ? styles.picker : styles.pickerIOS
                    }
                  >
                    <Picker.Item label='３０分間' value='３０分間' />
                    <Picker.Item label='１時間' value='１時間' />
                    <Picker.Item label='２時間' value='２時間' />
                  </Picker>
                  <Text>AVC</Text>
                </View>
              </Modal>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default ResignerPage3

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
  textInput: {
    height: 50,
    width: 300,
    fontSize: 18,
    backgroundColor: '#fff',
    color: 'black',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  picker: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#000',
    backgroundColor: '#fff',
  },
  pickerIOS: {
    flex: 1,
    width: 300,
    height: 200,
    bottom: 0,
    left: -10,
    position: 'relative',
  },
  textLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
})
