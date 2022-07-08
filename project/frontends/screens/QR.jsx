import { StyleSheet, Text, View, Button, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'

const QR = () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [text, setText] = useState('まだスキャンされていません')

  const askForCameraPermission = () => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status == 'granted')
    })()
  }

  //Request Camera Permission
  useEffect(() => {
    askForCameraPermission()
  }, [])

  //What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    setText(data)
    console.log('Type:' + type + '\nData: ' + data)
  }

  //Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>カメラの許可を求める</Text>
      </View>
    )
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>カメラにアクセスできません</Text>
        <Button onPress={() => askForCameraPermission()}>許可する</Button>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Button
        style={styles.maintext}
        onPress={() => Linking.openURL(`${text}`)}
        title={text}
      />

      {scanned && (
        <Button
          title={'もう一度スキャン'}
          onPress={() => setScanned(false)}
          color='tomato'
        />
      )}
    </View>
  )
}

export default QR

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
=======
    backgroundColor: '#fff',
>>>>>>> 0b9c9494e3444b92771411b28a12e906f1db29fc
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodebox: {
    // backgroundColor: 'white',
    alignItems: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
})
