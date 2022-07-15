import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { FontAwesome5, Fontisto, Ionicons } from '@expo/vector-icons'

import Colors from '../constants/colors'

const InformationProcess = () => {
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={[styles.row, styles.modalContent]}>
          <Image source={require('../assets/meet.png')}></Image>
          <View style={styles.textView}>
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
              <Text style={styles.textTitle}>大阪市北区中崎西2丁目３-14</Text>
              <Text style={styles.time}>営業中</Text>
            </View>
            <Text style={styles.shopName}>
              RICH GARDEN{' '}
              <Text style={styles.shopMenu}>ハンバーガー・アメリカ料理</Text>
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
  )
}

export default InformationProcess

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
  },
  time: {
    color: Colors.primary2,
    fontWeight: 'bold',
    fontSize: 10,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
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
})
