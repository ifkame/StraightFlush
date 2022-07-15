import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

import InformationProcess from '../components/InformationProcess'
const Information = () => {
  return (
    <ScrollView>
      <InformationProcess />
      <InformationProcess />
      <InformationProcess />
      <InformationProcess />
      <InformationProcess />
      <InformationProcess />
    </ScrollView>
  )
}

export default Information

const styles = StyleSheet.create({})
