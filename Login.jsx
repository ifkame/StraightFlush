import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import PrimaryButton from '../components/PrimaryButton'
import axios from 'axios';
import { add } from 'react-native-reanimated';
//　メールの正規表現用文字列
var mail_regex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
// APIのURL
const baseURL = 'http://localhost:8888/login/';

const Login = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [result, setResult ] = useState()

  const emailInputHandler = (enterText) => {
    setEmail(enterText)
  }
  const passwordInputHandler = (enterText) => {
    setPassword(enterText)
  }

  // ログインAPIを叩く関数
  const Login = async (json) => {
    try {
      //　HTTTPリクエストを行い、結果を変数に格納
      const response = await axios.post(`${baseURL}`,json,{ headers: {'Content-Type': 'application/json'} });
      // HTTPレスポンスコードを変数に格納
      const status = response.status;
      //　正常時
      if(status==200){
        // MAPページに遷移
        navigation.navigate('MapsNavigation');
      }
    } catch (error) {
      // エラー(ログイン失敗やサーバーエラー時)
      switch (error.response.status) {
        case 401:
          return error.response.data.detail;
        case 404:
          return error.response.data.detail;
        case 500:
          return "サーバーエラー、管理者に問い合わせてください";
      }
    }
  }

  async function sendRequest(json) {
    // APIを叩く関数を呼ぶ
      const result = await Login(json);
      setResult(result);
  }


  const onPress = () => {
    // メールの入力チェック
    if (!email || email === "") {
      setResult("メールアドレスを入力してください");
      return
    // メールの形式チェック
    }else if(!mail_regex.test(email)) {
      setResult("メールの形式が正しくありません。");
      return
    // OK
    }else{
      setResult("");
    }
    // パスワードの入力チェック
    if (!password || password === "") {
      setResult("パスワードを入力してください");
      return
    // OK
    }else{
      setResult("");
      //　入力されたメール・パスワードをまとめたユーザーオブジェクト
      var user_obj = {
        mail: email,
        password: password
      }
      // ユーザーオブジェクトをJSONに変換
      var json = JSON.stringify( user_obj );
      // 作成したJSONを引数に関数を呼ぶ
      sendRequest(json);
    }
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
      <Text>{result}</Text>

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
