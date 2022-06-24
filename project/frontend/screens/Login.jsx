import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import PrimaryButton from '../components/PrimaryButton'

const Login = () => {
  const navigation = useNavigation()

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const emailInputHandler = (enterText) => {
    setEmail(enterText)
  }
  const passwordInputHandler = (enterText) => {
    setPassword(enterText)
  }

  const onPress = () => {
    navigation.navigate('MapsNavigation')
  }

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/logo.png')} />
      </View>
      <View>
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

      <PrimaryButton onPress={onPress}>ログイン</PrimaryButton>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 100,
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
  inputPassword: {
    marginBottom: 20,
  },
})
