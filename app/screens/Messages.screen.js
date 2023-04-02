import PropTypes from 'prop-types'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FlatList, StyleSheet, TextInput, View } from 'react-native'
import { showRoom } from '../apis/chat.api'
import CustomButton from '../components/atoms/CustomButton.component'
import TextMessage from '../components/atoms/TextMessage.component'
import { apiWrapper } from '../utils/wrapper.api'
import { colors } from '../variables/colors.variables'
import { useSelector } from 'react-redux'
import { chatSocket } from '../utils/socket.utils'

const Messages = ({ route, navigation }) => {
  const [message, setMessage] = useState('')
  const [room, setRoom] = useState(undefined)
  const { userDetails } = useSelector((state) => state.userDetails)

  useEffect(() => {
    const success_fun = (data) => {
      setRoom(data)
    }
    apiWrapper(showRoom, route.params._id, success_fun)
  }, [])

  useEffect(() => {
    console.log(chatSocket.id)
    if (room && room._id) {
      chatSocket.emit('setup_connection', { roomId: room._id })
      chatSocket.on('receive_message', (data) => {
        if (data._id === room._id) setRoom(data)
      })
    }
  }, [room])

  useLayoutEffect(() => {
    if (room) navigation.setOptions({ title: room.room_name })
  }, [room])

  const handleNewMessage = () => {
    if (message.length > 0) {
      const payload = {
        roomId: room._id,
        author: userDetails._id,
        body: message,
        media: ''
      }
      chatSocket.emit('send_message', payload)
    }
  }

  return (
    <View style={styles.messagingscreen}>
      <View style={[styles.messagingscreen, styles.msg]}>
        <FlatList
          data={room && room.messages}
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
