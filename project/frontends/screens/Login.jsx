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
      <View style={styles.viewInput}>
        <Text style={styles.textLabel}>メールアドレス</Text>
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
        <Text style={styles.textLabel}>パスワード</Text>
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
    height: 50,
    width: 300,
    fontSize: 18,
    color: 'black',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  inputPassword: {
    marginBottom: 20,
  },
  textLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  viewInput: {
    marginBottom: 10,
  },
})
