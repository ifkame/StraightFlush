import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

import PrimaryButton from '../components/PrimaryButton'

const StartScreen = () => {
  const navigation = useNavigation()

  //FUNCTION
  const pressHandleResigner = () => {
    navigation.navigate('Resigner')
  }

  const pressHandleLogin = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/logo.png')} />
      </View>
      <View>
        <PrimaryButton onPress={pressHandleResigner}>新規登録</PrimaryButton>
        <PrimaryButton onPress={pressHandleLogin}>ログイン</PrimaryButton>
      </View>
    </View>
  )
}

export default StartScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 100,
  },
})
