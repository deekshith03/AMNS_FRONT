import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import globalStyles from '../../styles/global.styles'
import { colors } from '../../variables/colors.variables'

const ChatRoomTile = ({ item }) => {
  const navigation = useNavigation()

  const handleNavigation = () => {
    navigation.navigate('Messaging', {
      _id: item._id
    })
  }

  return (
    <TouchableOpacity style={styles.chat} onPress={handleNavigation}>
      <View style={globalStyles.flexRow}>
        <Ionicons
          name="person-circle-outline"
          size={45}
          color="black"
          style={styles.avatar}
        />
        <View style={styles.rightContainer}>
          <View>
            <Text style={styles.name}>{item.room_name}</Text>
            <Text style={styles.message}>{'Tap to start chat'}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  avatar: { marginRight: 15 },
  chat: {
    backgroundColor: colors.grayTone,
    borderRadius: 5,
    // elevation: 2,
    marginBottom: 3,
    padding: 15
  },
  message: { fontSize: 14, opacity: 0.7 },
  name: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5
  },
  rightContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  }
})

ChatRoomTile.propTypes = {
  item: PropTypes.object
}

export default ChatRoomTile
