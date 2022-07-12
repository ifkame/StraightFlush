import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import MapsProcess from '../components/MapsProcess'

const Maps = () => {
  return (
    <View style={styles.srceen}>
      <MapsProcess />
    </View>
  )
}

export default Maps

const styles = StyleSheet.create({
  srceen: {
    flex: 1,
  },
})
