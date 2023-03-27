import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { getRooms } from '../apis/chat.api'
import ChatRoomTile from '../components/atoms/ChatRoomTile.component'
import { apiWrapper } from '../utils/wrapper.api'
// import { chatRoom } from '../data/chat.sample'

const Chat = () => {
  const [rooms, setRooms] = useState([])
  const { userDetails } = useSelector((state) => state.userDetails)

  useEffect(() => {
    const success_fun = (data) => {
      setRooms(data)
      console.log('ddddaaaaatttttaaaa---><<<<----', data)
    }

    apiWrapper(getRooms, userDetails._id, success_fun)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.chatListContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatRoomTile item={item} />}
          />
        ) : (
          <View style={styles.emptyChat}>
            <Text style={styles.emptyChatText}>No rooms created</Text>
            <Text>Create a chatroom to start a new chat</Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  chatListContainer: { paddingBottom: '18%', paddingHorizontal: 3 },
  container: {
    flex: 1,
    padding: 5,
    top: 70
  },
  emptyChat: {
    alignItems: 'center',
    height: '80%',
    justifyContent: 'center',
    width: '100%'
  },
  emptyChatText: { fontSize: 24, fontWeight: 'bold', paddingBottom: 10 }
})

export default Chat
