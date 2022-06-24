import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

import Colors from '../constants/colors'

const PrimaryButton = ({ children, onPress }) => {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: Colors.secondary }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 10,
    overflow: 'hidden',
  },

  buttonInnerContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 70,
    elevation: 2,
    // textAlign: 'center', // Không có tính kế thừa nên ở đây ko có ý nghĩa
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.75,
  },
})
