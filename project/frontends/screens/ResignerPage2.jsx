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

import CustomDatePicker from '../components/CustomDatePicker'
import { Picker } from '@react-native-picker/picker'
import CustomPicker from '../components/CustomPicker'

import Colors from '../constants/colors'
import PrimaryButton from '../components/PrimaryButton'
import { AntDesign } from '@expo/vector-icons'
import { sexual } from '../constants/data'

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
  const { age, SetAge, gender, SetGender } = userContext

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
                  backgroundColor: '#fff',
                }}
                defaultDate={'1994-01-10'}
                onDateChange={(value) => console.log('Date changed ' + value)}
              />
            </View>

            <View style={styles.mb}>
              <Text style={styles.textLabel}>性別</Text>
              {Platform.OS !== 'ios' ? (
                <Picker
                  selectedValue={gender}
                  onValueChange={(value, index) => SetGender(value)}
                  mode='dialog'
                  style={
                    Platform.OS !== 'ios' ? styles.picker : styles.pickerIOS
                  }
                >
                  <Picker.Item label='男性' value='男性' />
                  <Picker.Item label='女性' value='女性' />
                  <Picker.Item label='その他' value='その他' />
                </Picker>
              ) : (
                <Pressable
                  onPress={() => SetAge(true)}
                  style={styles.inputView}
                >
                  <Text style={styles.inputText}>{gender}</Text>
                  <AntDesign name='caretdown' size={12} color='#888' />
                </Pressable>
              )}
            </View>
            <PrimaryButton onPress={onPressNext}>次へ</PrimaryButton>
          </View>
          {age && Platform.OS === 'ios' && (
            <CustomPicker
              setAgeModal={SetAge}
              ageModal={age}
              value={gender}
              setValue={SetGender}
              items={sexual}
            />
          )}
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

  textLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
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
    width: 300,
    height: 200,
  },
  mb: {
    marginBottom: Platform.OS === 'ios' ? 0 : 30,
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
  textIos: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
})
