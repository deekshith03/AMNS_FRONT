import { Feather } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FlatList, StyleSheet, TextInput, View } from 'react-native'
import { showRoom } from '../apis/chat.api'
import CustomButton from '../components/atoms/CustomButton.component'
import TextMessage from '../components/atoms/TextMessage.component'
import { apiWrapper } from '../utils/wrapper.api'
import { colors } from '../variables/colors.variables'

const Messages = ({ route, navigation }) => {
  const [message, setMessage] = useState('')
  const [room, setRoom] = useState({})

  console.log('new page ----====-------- route--')
  console.log('route--', route.params)

  useEffect(() => {
    const success_fun = (data) => {
      setRoom(data)
      console.log('dadtu--->', data.room_name)
    }
    apiWrapper(showRoom, route.params._id, success_fun)
  }, [])

  useLayoutEffect(() => {
    console.log('rrrrooooommmmmmmmm', room.messages)
    navigation.setOptions({ title: room.room_name })
  }, [room])

  const handleNewMessage = () => {
    
  }

  const msgs = [
    {
      author: 2,
      timestamp: 1679896101088,
      message: '22Hi how are you?',
      media: ''
    },
    {
      author: 4,
      timestamp: 1679896109288,
      message:
        '44I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?',
      media: ''
    },
    {
      author: 2,
      timestamp: 1679896909288,
      message:
        '22I goodI am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?',
      media: ''
    },
    {
      author: 2,
      timestamp: 1679896989388,
      message: '22 I goodI am fine, how are you?',
      media: ''
    }
  ]
  console.log(room.messages, '---/')
  return (
    <View style={styles.messagingscreen}>
      <View style={[styles.messagingscreen, styles.msg]}>
        <FlatList
          data={room.messages}
          renderItem={({ item }) => (
            <TextMessage item={item} author={item.author} />
          )}
        />
      </View>
      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          placeholder={'Type Here'}
          onChangeText={(value) => setMessage(value)}
        />
        {/* <Feather name={'upload'} size={24} /> */}
        <CustomButton
          text={'Send'}
          alignItems="center"
          handleClick={handleNewMessage}
          backgroundColor={colors.loginPink}
          fontColor={colors.white}
          fontFamily={'Roboto'}
          fontSize={18}
          // paddingHorizontal={10}
          bordered={true}
          customWidth={80}
          // icon={'send'}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  messaginginput: {
    borderRadius: 25,
    borderWidth: 1,
    flex: 1,
    marginRight: 10,
    padding: 10
  },
  messaginginputContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  messagingscreen: {
    backgroundColor: colors.white,
    flex: 1
  },
  msg: { paddingHorizontal: 10, paddingVertical: 10 }
})

Messages.propTypes = {
  route: PropTypes.any,
  navigation: PropTypes.any
}

export default Messages
