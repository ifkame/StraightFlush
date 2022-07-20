import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from 'react-native'
import React, { useState } from 'react'

import Colors from '../constants/colors'

import { useSelector } from 'react-redux'
import { MEET } from '../constants/data'

const Shop = ({ navigation }) => {
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids)

  const favoriteMeals = MEET.filter((category) =>
    favoriteMealIds.includes(category.id)
  )
  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rottContainer}>
        <Text style={styles.text}>お気に入り店舗はまだありません</Text>
      </View>
    )
  }

  const renderCategoryItem = (itemData) => {
    const pressHandler = () => {
      navigation.navigate('StampScreen', {
        meetId: itemData.item.id,
      })
    }

    return (
      <Pressable onPress={pressHandler}>
        <View style={styles.container}>
          <Image source={{ uri: itemData.item.image }} style={styles.img} />
          <Text>{itemData.item.shop}</Text>
          <Text>{itemData.item.name}</Text>
        </View>
      </Pressable>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.image}>
        <Image
          source={require('../assets/shop.png')}
          style={{ width: 70, height: 70 }}
        />
      </View>
      <View style={styles.screen}>
        <Text style={styles.txt}>お気に入り店舗　9件</Text>
      </View>
      <FlatList
        data={favoriteMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
      />
    </View>
  )
}

export default Shop

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  text: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  img: {
    width: 150,
    height: 150,
  },
})
