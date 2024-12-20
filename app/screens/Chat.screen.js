import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { getRooms } from '../apis/chat.api'
import ChatRoomTile from '../components/atoms/ChatRoomTile.component'
import { apiWrapper } from '../utils/wrapper.api'
// import { chatRoom } from '../data/chat.sample'

const Chat = () => {
  const [rooms, setRooms] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const { userDetails } = useSelector((state) => state.userDetails)

  const success_fun = (data) => {
    setRooms(data)
  }

  useEffect(() => {
    apiWrapper(getRooms, userDetails._id, success_fun)
  }, []) 

  const updateHandler = () => {
    setRefreshing(true)
    apiWrapper(getRooms, userDetails._id, success_fun)
    setRefreshing(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.chatListContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatRoomTile item={item} />}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={updateHandler}
              />
            }
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
  chatListContainer: { marginBottom: '25%' },
  container: {
    flex: 1,
    paddingHorizontal: 5,
    top: 100
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
