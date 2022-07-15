import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import Colors from '../constants/colors'
import { MEET } from '../constants/data'

const Stamp = () => {
  const navigation = useNavigation()

  const renderItem = (itemData) => {
    const openStamp = () => {
      navigation.navigate('StampDetails', {
        meetId: itemData.item.id,
      })
    }
    return (
      <>
        <Pressable style={styles.groupImage} onPress={openStamp}>
          <Image source={itemData.item.image} style={styles.image} />
        </Pressable>
      </>
    )
  }

  return (
    <>
      <View style={{ marginTop: 20, marginBottom: 70 }}>
        <View style={styles.screen}>
          <View style={styles.group}>
            <Image source={require('../assets/stamp.png')} />
            <Text style={styles.number}>27/100</Text>
          </View>
        </View>
        <FlatList
          numColumns={3}
          data={MEET}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  )
}

export default Stamp

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  group: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    height: 30,
  },
  image: {
    margin: 10,
  },
  groupImage: {
    flex: 1,
    alignItems: 'center',
  },
})
