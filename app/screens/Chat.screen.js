import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import ChatRoomTile from '../components/atoms/ChatRoomTile.component'
import NewChatModal from '../components/atoms/NewChatModal.component'
import { chatRoom } from '../data/chat.sample'
import globalStyles from '../styles/global.styles'
import { colors } from '../variables/colors.variables'

const Chat = () => {
  const [visible, setVisible] = useState(false)
  return (
    <View style={styles.container}>
      <View style={[styles.newChatContainer]}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <View style={globalStyles.flexRow}>
            <Text style={styles.chatHeading}>Create Room</Text>
            <Feather name="edit" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.chatListContainer}>
        {chatRoom.length > 0 ? (
          <FlatList
            data={chatRoom}
            renderItem={({ item }) => <ChatRoomTile item={item} />}
          // keyExtractor={(item) => item._id}
          />
        ) : (
          <View style={styles.emptyChat}>
            <Text style={styles.emptyChatText}>No rooms created</Text>
            <Text>Create a chatroom to start a new chat</Text>
          </View>
        )}
      </View>
      {visible ? <NewChatModal setVisible={setVisible} /> : ''}
    </View>
  )
}

const styles = StyleSheet.create({
  chatHeading: { fontSize: 24, marginRight: 15 },
  chatListContainer: { paddingBottom: '35%', paddingHorizontal: 3 },
  container: {
    flex: 1,
    padding: 5,
    top: 65
  },
  emptyChat: {
    alignItems: 'center',
    height: '80%',
    justifyContent: 'center',
    width: '100%'
  },
  emptyChatText: { fontSize: 24, fontWeight: 'bold', paddingBottom: 10 },
  newChatContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.loginPink,
    borderRadius: 20,
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    width: '50%'
  }
})

export default Chat
