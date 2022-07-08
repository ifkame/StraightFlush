import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

<<<<<<< HEAD
import Carousel from 'react-native-snap-carousel'

const MyPage = () => {
  const carouselItems = [
    {
      title: 'A',
      image: 'av',
    },
    {
      title: 'B',
      image: 'av',
    },
    {
      title: 'C',
      image: 'av',
    },
    {
      title: 'D',
      image: 'av',
    },
  ]

  function renderItem({ item }) {
    return (
      <>
        (
        <View>
          <Text>{item.title}</Text>
        </View>
        )
      </>
    )
  }

  return (
    <>
      <View style={styles.screen}>
        <Carousel
          data={carouselItems}
          sliderWidth={300}
          itemWidth={300}
          renderItem={renderItem}
        />
      </View>
    </>
=======
const MyPage = () => {
  return (
    <View>
      <Text>MyPage</Text>
    </View>
>>>>>>> 0b9c9494e3444b92771411b28a12e906f1db29fc
  )
}

export default MyPage

<<<<<<< HEAD
const styles = StyleSheet.create({
  screen: { flex: 1 },
})
=======
const styles = StyleSheet.create({})
>>>>>>> 0b9c9494e3444b92771411b28a12e906f1db29fc
