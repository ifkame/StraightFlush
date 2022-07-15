import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import InformationProcess from '../components/InformationProcess'

import Colors from '../constants/colors'

const Shop = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.image}>
        <Image
          source={require('../assets/setting.png')}
          style={{ width: 70, height: 70 }}
        />
      </View>
      <View style={styles.screen}>
        <Text style={styles.txt}>お気に入り店舗　9件</Text>
      </View>
      <InformationProcess />
      <InformationProcess />
      <InformationProcess />
      <InformationProcess />
      <InformationProcess />
      <InformationProcess />
      <InformationProcess />
      <InformationProcess />
      <InformationProcess />
      <InformationProcess />
    </ScrollView>
  )
}

export default Shop

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  txt: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    paddingVertical: 20,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: Colors.primary2,
    width: '100%',
    height: 170,
  },
})
