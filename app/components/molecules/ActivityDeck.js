import { Feather, FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { useSelector } from 'react-redux'
import { createRoom } from '../../apis/chat.api'
import { apiWrapper } from '../../utils/wrapper.api'
import { colors } from '../../variables/colors.variables'

const styles = StyleSheet.create({
  ImageStyles: {
    paddingBottom: 8
  },

  activityDeck: {
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 8,
    width: '100%'
  },
  deckItem: {
    alignItems: 'center',
    borderColor: colors.lightGrey,
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
})

export const ActivityDeck = () => {
  const profile = useSelector((state) => state.profileSelected.value)
  const { userDetails } = useSelector((state) => state.userDetails)

  const navigation = useNavigation()

  const handleMessageNavigation = async () => {
    const success_fun = (data) => {
      navigation.navigate('Messaging', { _id: data.message.doc._id })
    }
    await apiWrapper(
      createRoom,
      {
        roomName: profile.personal_info.name,
        members: [userDetails._id, profile.user_id]
      },
      success_fun
    )
  }

  return (
    <Shadow>
      <View style={[styles.activityDeck]}>
        {/* {profile.user_id ? (
          <TouchableOpacity onPress={handleMessageNavigation}>
            <View style={styles.deckItem}>
              <Feather
                style={styles.ImageStyles}
                name="message-circle"
                size={24}
                color={colors.loginpink}
              />
              <Text>Message</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.deckItem}>
            <Feather name="bell-off" size={24} color={colors.loginpink} />
            <Text>Message</Text>
          </View>
        )} */}
        <TouchableOpacity onPress={handleMessageNavigation}>
          <View style={styles.deckItem}>
            <Feather
              style={styles.ImageStyles}
              name="message-circle"
              size={24}
              color={colors.loginpink}
            />
            <Text>Message</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.deckItem}>
          <FontAwesome5
            style={styles.ImageStyles}
            name="coins"
            size={24}
            color="gold"
          />
          <Text>50</Text>
        </View>
        <View style={styles.deckItem}>
          <Feather
            style={styles.ImageStyles}
            name={profile.user_id ? 'user-check' : 'user-x'}
            size={24}
            color={profile.user_id ? 'green' : 'red'}
          />
          <Text>{profile.user_id ? 'Registered' : 'Not Registered'}</Text>
        </View>
      </View>
    </Shadow>
  )
}
