import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { Feather, FontAwesome5 } from '@expo/vector-icons'
import { colors } from '../../variables/colors.variables'
import { Shadow } from 'react-native-shadow-2'
import { useSelector } from 'react-redux'

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

  return (
    <Shadow>
      <View style={[styles.activityDeck]}>
        <View style={styles.deckItem}>
          <Feather
            style={styles.ImageStyles}
            name="message-circle"
            size={24}
            color={colors.loginpink}
          />
          <Text>Message</Text>
        </View>
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
