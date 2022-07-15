import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { FontAwesome5, Fontisto, Ionicons } from '@expo/vector-icons'
import InformationProcess from '../components/InformationProcess'

import Carousel from 'react-native-snap-carousel'

import Colors from '../constants/colors'

const MyPage = () => {
  const navigation = useNavigation()

  const carouselItems = [
    {
      title: 'A',
      image: 'meet',
    },
    {
      title: 'B',
      image: 'meet',
    },
    {
      title: 'C',
      image: 'meet',
    },
    {
      title: 'D',
      image: 'meet',
    },
  ]

  function renderItem({ item }) {
    return <InformationProcess />
  }

  const handleProfile = () => {
    navigation.navigate('Profile')
  }

  const handleSetting = () => {
    navigation.navigate('Setting')
  }

  const handleShop = () => {
    navigation.navigate('Shop')
  }

  return (
    <>
      <View style={styles.screen}>
        <Text style={styles.txt}>コイン残高</Text>
        <View style={styles.coin}>
          <Image source={require('../assets/coin.png')} />
          <Text style={styles.number}>
            240<Text style={styles.unit}>pt</Text>
          </Text>
        </View>
        <Text style={styles.txt}>来店履歴</Text>
        <Carousel
          data={carouselItems}
          sliderWidth={400}
          itemWidth={400}
          renderItem={renderItem}
          layout={'default'}
        />

        <View style={styles.controlContainer}>
          <Pressable style={styles.control} onPress={handleProfile}>
            <Image source={require('../assets/profile.png')} />
            <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 5 }}>
              プロフィール編集
            </Text>
          </Pressable>
          <Pressable style={styles.control} onPress={handleSetting}>
            <Image source={require('../assets/setting.png')} />
            <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 5 }}>
              アプリ設定
            </Text>
          </Pressable>
        </View>

        <Pressable style={styles.controlBottom} onPress={handleShop}>
          <Image source={require('../assets/shop.png')} />
          <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 5 }}>
            お気に入り店舗
          </Text>
        </Pressable>
      </View>
    </>
  )
}

export default MyPage

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 30,
  },
  coin: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.primary,
    paddingLeft: 10,
  },
  unit: {
    color: 'black',
    fontSize: 20,
  },
  controlContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  control: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    width: 120,
    height: 120,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  controlBottom: {
    width: 260,
    height: 100,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    borderRadius: 10,
  },
})
