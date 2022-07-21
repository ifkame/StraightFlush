import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomMission from '../components/CustomMission'
import Colors from '../constants/colors'

const Mission = () => {
  return (
    <>
      <View style={styles.screen}>
        <Text style={styles.txt}>ミッション一覧</Text>
        <CustomMission text='7月中に5店舗で食事する' point='報酬：3pt' />
        <CustomMission text='開業30日以内の2店舗で食事する' point='報酬：5pt' />
        <CustomMission
          text='3店舗で2000円以上の食事をする'
          point='報酬：10pt'
        />
        <CustomMission
          text='来店履歴がないお店で食事をする'
          point='報酬：3pt'
        />
        <Text style={{ color: '#888', marginTop: 10 }}>次回更新まで17日</Text>
      </View>
    </>
  )
}

export default Mission

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
})
