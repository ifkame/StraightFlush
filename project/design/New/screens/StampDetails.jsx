import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import PrimaryButton from '../components/PrimaryButton'
import { Ionicons } from '@expo/vector-icons'

import { MEET } from '../constants/data'
import Colors from '../constants/colors'

const StampDetails = () => {
  const [icon, setIcon] = useState(false)
  const navigation = useNavigation()
  const route = useRoute()

  const mealId = route.params.meetId

  const selectedMeal = MEET.find((meal) => meal.id === mealId)

  const onPress = () => {}
  return (
    <View style={styles.screen}>
      <Image source={selectedMeal.image} style={styles.image} />
      <View style={styles.box}>
        <Text style={styles.txt}>店舗名：美味しいお店</Text>
        <Text style={styles.txt}>頼んだメニュー：サンドウィッチ</Text>
        <Text style={styles.txt}>来店回数：2回</Text>
        <Text style={styles.txt}>最新来店日時：2022年6月22日</Text>
      </View>
      <View style={styles.likes}>
        <PrimaryButton>更新する</PrimaryButton>
        <Pressable onPress={onPress}>
          {icon ? (
            <Ionicons name='star' size={24} color={Colors.primary} />
          ) : (
            <Ionicons name='star-outline' size={24} color='black' />
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
})
