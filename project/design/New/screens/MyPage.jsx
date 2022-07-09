import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import { FontAwesome5, Fontisto, Ionicons } from '@expo/vector-icons'
import InformationProcess from '../components/InformationProcess'

import Carousel from 'react-native-snap-carousel'

import Colors from '../constants/colors'

const MyPage = () => {
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

  return (
    <>
      <View style={styles.screen}>
        <Carousel
          data={carouselItems}
          sliderWidth={400}
          itemWidth={400}
          renderItem={renderItem}
          layout={'default'}
        />
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
    borderRadius: 20,
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
