import PropTypes from 'prop-types'
import React, { useLayoutEffect, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import TextMessage from '../components/atoms/TextMessage.component'
import { colors } from '../variables/colors.variables'

const Messages = ({ route, navigation }) => {
  const [chatMessages, setChatMessages] = useState(route.params.messages)

  console.log(chatMessages)
  const [message, setMessage] = useState('')
  // const [author, setauthor] = useState('')

  const { room_name } = route.params

  useLayoutEffect(() => {
    navigation.setOptions({ title: room_name })
  }, [])

  const handleNewMessage = () => {}

  return (
    <View style={styles.messagingscreen}>
      <View style={[styles.messagingscreen, styles.msg]}>
        {chatMessages ? (
          <FlatList
            data={chatMessages}
            renderItem={({ item }) => (
              <TextMessage item={item} author={item.author} />
            )}
          />
        ) : (
          ''
        )}
      </View>
      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          onChangeText={(value) => setMessage(value)}
        />
        <TouchableOpacity
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}>
          <View>
            <Text style={styles.send}>SEND</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  messagingbuttonContainer: {
    alignItems: 'center',
    backgroundColor: colors.green,
    // borderRadius: 3,
    borderRadius: 50,
    justifyContent: 'center',
    width: '30%'
  },
  messaginginput: {
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    marginRight: 10,
    padding: 15
  },
  messaginginputContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    minHeight: 100,
    paddingHorizontal: 15,
    paddingVertical: 30,
    width: '100%'
  },
  messagingscreen: {
    flex: 1
  },
  msg: { paddingHorizontal: 10, paddingVertical: 15 },
  send: {
    color: colors.white,
    fontSize: 20
  }
})

Messages.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object
}

export default Messages
