import { StyleSheet, Text, View, Modal, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5, Fontisto, Ionicons } from '@expo/vector-icons'

<<<<<<< HEAD
import { useNavigation } from '@react-navigation/native'

import Colors from '../constants/colors'

const MapsProcess = () => {
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <View style={styles.screen}>
      <Pressable
        style={[styles.qr, styles.circleStyle]}
        onPress={() => navigation.navigate('QR')}
      >
        <Ionicons name='qr-code-sharp' size={24} color='black' />
      </Pressable>
      <Pressable style={[styles.direction, styles.circleStyle]}>
        <Image source={require('../assets/direction.png')}></Image>
      </Pressable>
=======
import Colors from '../constants/colors'

const MapsProcess = () => {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <View style={styles.screen}>
      <Ionicons name='qr-code-sharp' size={24} color='black' />
      <Image source={require('../assets/direction.png')}></Image>
>>>>>>> 0b9c9494e3444b92771411b28a12e906f1db29fc
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.buttonClose}>
              <Pressable onPress={() => setModalVisible(false)}>
                <FontAwesome5 name='times' size={24} color={Colors.primary} />
              </Pressable>
            </View>
            <View style={[styles.row, styles.modalContent]}>
              <Image source={require('../assets/meet.png')}></Image>
              <View style={styles.textView}>
<<<<<<< HEAD
                <View style={[styles.row, { justifyContent: 'space-between' }]}>
=======
                <View style={[styles.row]}>
>>>>>>> 0b9c9494e3444b92771411b28a12e906f1db29fc
                  <Text style={styles.textTitle}>
                    大阪市北区中崎西2丁目３-14
                  </Text>
                  <Text style={styles.time}>営業中</Text>
                </View>
                <Text style={styles.shopName}>
                  RICH GARDEN{' '}
                  <Text style={styles.shopMenu}>
                    ハンバーガー・アメリカ料理
                  </Text>
                </Text>
                <Text>谷町線 中崎町駅から徒歩4分</Text>
                <Text style={styles.content}>
                  当店ではハンバーガーをお店のメインメニューとして販売しており他にも
                  ステーキなどサンドウィッチなども...
                </Text>
                <View style={[styles.row, styles.address]}>
                  <View style={styles.row}>
                    <FontAwesome5
                      name='phone-alt'
                      size={16}
                      color={Colors.primary}
                    />
                    <Text style={styles.margin}>06-6147-7695</Text>
                  </View>
                  <View style={styles.row}>
                    <Fontisto
                      name='shopping-store'
                      size={16}
                      color={Colors.primary}
                    />
                    <Text style={styles.margin}>11:00 - 22:00 </Text>
                  </View>
                  <Ionicons name='md-star' size={24} color={Colors.primary} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Ionicons name='location-sharp' size={40} color={Colors.primary} />
      </Pressable>
    </View>
  )
}

export default MapsProcess

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  margin: {
    paddingLeft: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 90,
  },
  buttonClose: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 1,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    width: '100%',

    alignItems: 'center',
  },
  textView: {
    paddingRight: 80,
    paddingLeft: 10,
  },
  textTitle: {
    paddingRight: 45,
    fontSize: 10,
  },
  time: {
    color: Colors.primary2,
    fontWeight: 'bold',
    fontSize: 10,
  },
  shopName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  shopMenu: {
    fontSize: 8,
  },

  content: {
    marginVertical: 5,
    fontSize: 8,
  },
  address: {
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 8,
  },
<<<<<<< HEAD
  qr: {
    position: 'absolute',
    bottom: 90,
    right: 20,
  },
  direction: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  circleStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
=======
>>>>>>> 0b9c9494e3444b92771411b28a12e906f1db29fc
})
