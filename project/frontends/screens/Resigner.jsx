import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import Colors from '../constants/colors'
import { Ionicons, Fontisto } from '@expo/vector-icons'

const Resigner = () => {
  const navigation = useNavigation()
  const onPress = () => {
    navigation.navigate('ResignerPage1')
  }
  const onPressGroup = () => {
    navigation.navigate('ResignerGroup1')
  }

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/logo.png')} />
      </View>
      <View>
        <View style={styles.buttonOuterContainer}>
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.buttonInnerContainer, styles.pressed, styles.bg1]
                : [styles.buttonInnerContainer, styles.bg1]
            }
            onPress={onPress}
            android_ripple={{ color: '#ccc' }}
          >
            <Text style={styles.buttonText}>一般</Text>
            <Ionicons name='person-outline' size={50} color='white' />
          </Pressable>
        </View>
      </View>
      <View>
        <View style={styles.buttonOuterContainer}>
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.buttonInnerContainer, styles.pressed, , styles.bg2]
                : [styles.buttonInnerContainer, styles.bg2]
            }
            onPress={onPressGroup}
            android_ripple={{ color: '#ccc' }}
          >
            <Text style={styles.buttonText}>経営者</Text>
            <Fontisto name='shopping-store' size={50} color='white' />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default Resigner

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 100,
  },

  buttonOuterContainer: {
    borderRadius: 28,
    margin: 10,
    overflow: 'hidden',
  },

  buttonInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 28,
    width: 280,
    height: 120,
    elevation: 2,
    // textAlign: 'center', // Không có tính kế thừa nên ở đây ko có ý nghĩa
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    paddingRight: 20,
  },
  pressed: {
    opacity: 0.75,
  },
  bg1: {
    backgroundColor: Colors.primary,
  },
  bg2: {
    backgroundColor: Colors.primary2,
  },
})
