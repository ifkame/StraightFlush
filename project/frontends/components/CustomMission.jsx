import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import Colors from '../constants/colors'

const CustomMission = ({ text, point }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/mission.png')} />
      <View style={styles.grouptxt}>
        <Text style={{ color: '#fff', fontSize: 15 }}>{text}</Text>
        <Text style={{ color: '#fff', fontSize: 15 }}>{point}</Text>
      </View>
    </View>
  )
}

export default CustomMission

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    width: 300,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  grouptxt: {
    marginLeft: 10,
  },
})
