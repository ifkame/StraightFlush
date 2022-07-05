import {
  StyleSheet,
  Text,
  View,
  Platform,
  Modal,
  Pressable,
  TouchableHighlight,
} from 'react-native'
import React from 'react'

import { Picker } from '@react-native-picker/picker'
import Colors from '../constants/colors'
import { AntDesign } from '@expo/vector-icons'

const CustomPicker = ({ showModal, setShowModal, value, setValue, items }) => {
  const pickerData = (data) => {
    return (
      data?.length > 0 &&
      data.map((val, index) => {
        return <Picker.Item label={val} value={val} key={index} />
      })
    )
  }
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
        setShowModal(!showModal)
      }}
    >
      <View style={styles.screen}>
        <View style={styles.pickerContainer}>
          <View style={styles.button}>
            <TouchableHighlight onPress={() => setShowModal(!showModal)}>
              <Text style={{ fontSize: 16 }}>キャンセル</Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => {
                setShowModal(!showModal)
              }}
            >
              <Text style={styles.textIos}>完了</Text>
            </TouchableHighlight>
          </View>
          <Picker
            selectedValue={value}
            onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
            mode='dialog'
            style={{ height: 50, width: '100%' }}
          >
            {pickerData(items)}
          </Picker>
        </View>
      </View>
    </Modal>
  )
}

export default CustomPicker

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: '30%',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 10,
  },
  textIos: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
})
