import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useState } from 'react'

import PrimaryButton from '../components/PrimaryButton'
import { Ionicons } from '@expo/vector-icons'

import { MEET } from '../constants/data'
import Colors from '../constants/colors'

import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from '../store/favorites'

const StampDetails = ({ navigation, route }) => {
  const { meetId } = route.params

  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids)

  const selectedMeal = MEET.find((meal) => meal.id === meetId)
  const dispatch = useDispatch()
  const mealsIsFavorite = favoriteMealIds.includes(meetId)

  const changeFavorite = () => {
    if (mealsIsFavorite) {
      dispatch(removeFavorite({ id: meetId }))
    } else {
      dispatch(addFavorite({ id: meetId }))
    }
  }

  return (
    <View style={styles.screen}>
      <Image source={{ uri: selectedMeal.image }} style={styles.image} />
      <View style={styles.box}>
        <Text style={styles.txt}>店舗名：{selectedMeal.shop}</Text>
        <Text style={styles.txt}>メニュー：{selectedMeal.name}</Text>
        <Text style={styles.txt}>来店回数：2回</Text>
        <Text style={styles.txt}>最新来店日時：2022年6月22日</Text>
      </View>
      <View style={styles.likes}>
        <PrimaryButton>更新する</PrimaryButton>
        <Pressable onPress={changeFavorite} style={styles.star}>
          {mealsIsFavorite ? (
            <Ionicons name='star' size={24} color={Colors.primary} />
          ) : (
            <Ionicons name='star-outline' size={24} color={Colors.primary} />
          )}
        </Pressable>
      </View>
    </View>
  )
}

export default StampDetails

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  box: {
    width: 300,
    height: 200,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ccc',
    marginTop: 60,
    marginBottom: 30,
    padding: 10,
    justifyContent: 'center',
  },
  txt: {
    fontSize: 18,
    paddingVertical: 8,
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    borderWidth: 1,
    borderColor: '#888',
    padding: 5,
    borderRadius: 10,
  },
})
