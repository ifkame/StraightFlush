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
import { MaterialIcons } from '@expo/vector-icons'

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
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                }}
                activeOpacity={1}
                visible={show}
                onPress={() => setShow(false)}
              >
                <TouchableHighlight
                  underlayColor={'#FFF'}
                  style={{
                    flex: 1,
                    borderTopColor: '#e9e9e9',
                    borderTopWidth: 1,
                  }}
                  onPress={() => console.log('datepickder click')}
                >
                  <View
                    style={{
                      backgroundColor: '#fff',
                      height: 256,
                      overflow: 'hidden',
                      // width: '100%',
                    }}
                  >
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
                      <Text>キャンセル</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor={'transparent'}
                      onPress={onDonePress}
                      style={[styles.btnText, styles.btnDone]}
                    >
                      <Text>完了</Text>
                    </TouchableHighlight>
                  </View>
                </TouchableHighlight>
              </TouchableHighlight>
            </View>
          </Modal>
        )}
      </View>
      <MaterialIcons name='keyboard-arrow-down' size={24} color='black' />
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
    width: 280,
    paddingVertical: 10,
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  btnText: {
    position: 'absolute',
    top: 0,
    height: 42,
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
  },
})
