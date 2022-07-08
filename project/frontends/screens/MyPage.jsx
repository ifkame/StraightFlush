import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

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
  )
}

export default MyPage

const styles = StyleSheet.create({
  screen: { flex: 1 },
})
