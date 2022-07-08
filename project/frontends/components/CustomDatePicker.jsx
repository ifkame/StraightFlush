import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  Pressable,
  Platform,
} from 'react-native'
import React, { useState } from 'react'

import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import { AntDesign } from '@expo/vector-icons'
import Colors from '../constants/colors'

const CustomDatePicker = (props) => {
  const { textStyle, defaultDate } = props
  const [date, setDate] = useState(moment(defaultDate))
  const [show, setShow] = useState(false)

  const onChange = (e, selectedDate) => {
    setDate(moment(selectedDate))
  }

  const onAndroidChange = (e, selectedDate) => {
    setShow(false)
    if (selectedDate) {
      setDate(moment(selectedDate))
      props.onDateChange(selectedDate)
    }
  }

  const onCancelPress = () => {
    setDate(moment(defaultDate))
    setShow(false)
  }

  const onDonePress = () => {
    props.onDateChange(date)
    setShow(false)
  }

  const renderDatePicker = () => {
    return (
      <DateTimePicker
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        timeZoneOffsetInMinutes={0}
        value={new Date(date)}
        mode='date'
        minimumDate={
          new Date(moment().subtract(120, 'years').format('YYYY-MM-DD'))
        }
        maximumDate={new Date(moment().format('YYYY-MM-DD'))}
        onChange={Platform.OS === 'ios' ? onChange : onAndroidChange}
      />
    )
  }

  return (
    <Pressable
      style={styles.box}
      activeOpacity={0}
      onPress={() => setShow(true)}
    >
      <View>
        <Text style={styles.textDate}>{date.format('YYYY年MM月DD日')}</Text>

        {Platform.OS !== 'ios' && show && renderDatePicker()}

        {Platform.OS === 'ios' && (
          <Modal
            transparent={true}
            animationType='slide'
            visible={show}
            supportedOrientations={['portrait']}
            onRequestClose={() => setShow(!show)}
          >
            <View style={styles.screen}>
              <TouchableHighlight
                underlayColor={'#FFF'}
                style={styles.pickerContainer}
              >
                <View style={{ backgroundColor: '#fff' }}>
                  <View
                    style={{
                      marginTop: 20,
                    }}
                  >
                    {renderDatePicker()}
                  </View>
                  <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={onCancelPress}
                    style={[styles.btnText, styles.btnCancel]}
                  >
                    <Text style={{ fontSize: 18 }}>キャンセル</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={onDonePress}
                    style={[styles.btnText, styles.btnDone]}
                  >
                    <Text
                      style={{
                        color: Colors.primary,
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}
                    >
                      完了
                    </Text>
                  </TouchableHighlight>
                </View>
              </TouchableHighlight>
            </View>
          </Modal>
        )}
      </View>
      <AntDesign name='caretdown' size={9} color='#888' style={styles.arrow} />
    </Pressable>
  )
}

CustomDatePicker.defaultProps = {
  textStyle: {},
  defaultDate: moment(),
  onDateChange: () => {},
  //
}

export default CustomDatePicker

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  btnText: {
    position: 'absolute',
    top: 0,
    height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCancel: {
    left: 0,
  },
  btnDone: {
    right: 0,
  },
  textDate: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  modalGroup: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  arrow: {
    paddingRight: 18,
    paddingTop: 10,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: '30%',
    position: 'absolute',
    bottom: 0,
  },
})
