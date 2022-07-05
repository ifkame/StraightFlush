import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native'
import React, { useState } from 'react'
import StepIndicator from 'react-native-step-indicator'

import Colors from '../constants/colors'
import PrimaryButton from '../components/PrimaryButton'
import CustomPicker from '../components/CustomPicker'
import { time, meter } from '../constants/data'

import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'
import { AntDesign } from '@expo/vector-icons'

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
  const [modalTop, setModalTop] = useState(false)
  const [modalBottom, setModalBottom] = useState(false)

  const [frequency, setFrequency] = useState('１時間')
  const [range, setRange] = useState('１００m')

  const navigation = useNavigation()

  const onPressNext = () => {
    navigation.navigate('Login')
  }

  // PICKER OPEN
  const openPicker = () => {
    setModalTop(true)
  }

  const openPickerBottom = () => {
    setModalBottom(true)
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
                  style={styles.picker}
                >
                  <Picker.Item label='３０分間' value='３０分間' />
                  <Picker.Item label='１時間' value='１時間' />
                  <Picker.Item label='２時間' value='２時間' />
                </Picker>
              ) : (
                <Pressable onPress={openPicker} style={styles.inputView}>
                  <Text style={styles.inputText}>{frequency}</Text>
                  <AntDesign name='caretdown' size={12} color='#888' />
                </Pressable>
              )}
            </View>
            <View>
              <Text style={styles.textLabel}>通知範囲</Text>
              {Platform.OS !== 'ios' ? (
                <Picker
                  selectedValue={range}
                  onValueChange={(value, index) => setRange(value)}
                  mode='dialog'
                  style={
                    Platform.OS !== 'ios' ? styles.picker : styles.pickerIOS
                  }
                >
                  <Picker.Item label='５０m' value='５０m' />
                  <Picker.Item label='１００m' value='１００m' />
                  <Picker.Item label='３００m' value='３００m' />
                </Picker>
              ) : (
                <Pressable onPress={openPickerBottom} style={styles.inputView}>
                  <Text style={styles.inputText}>{range}</Text>
                  <AntDesign name='caretdown' size={12} color='#888' />
                </Pressable>
              )}
            </View>
            <PrimaryButton onPress={onPressNext}>次へ</PrimaryButton>

            {modalTop && Platform.OS === 'ios' && (
              <CustomPicker
                setShowModal={setModalTop}
                showModal={modalTop}
                value={frequency}
                setValue={setFrequency}
                items={time}
              />
            )}

            {modalBottom && Platform.OS === 'ios' && (
              <CustomPicker
                setShowModal={setModalBottom}
                showModal={modalBottom}
                value={range}
                setValue={setRange}
                items={meter}
              />
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

  inputView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: 300,
    height: 50,
    backgroundColor: '#fff',
    padding: 10,
  },
  inputText: { fontSize: 16 },
  textLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
})
