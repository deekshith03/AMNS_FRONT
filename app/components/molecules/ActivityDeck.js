import { Feather, FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { Shadow } from 'react-native-shadow-2'
import { useDispatch, useSelector } from 'react-redux'
import { changeState } from '../../redux/slices/loading.slice'
import { colors } from '../../variables/colors.variables'
import { axiosInstance } from '../../variables/variable'

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
  // const { userDetails } = useSelector((state) => state.userDetails)
  const [userDetails, setUserDetails] = useState({})
  const [roomName, setRoomName] = useState('')
  const [members, setMembers] = useState([])

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleMessageNavigation = async () => {
    if (Object.keys(userDetails).length === 0) {
      dispatch(changeState(true))
      await axiosInstance
        .get('/api/profile/user')
        .then((res) => {
          if (res.data) {
            setUserDetails(res.data)
          }
        })
        .catch((error) => {
          const statusCode = error.response ? error.response.status : null
          if (statusCode === 500 || statusCode === 400) {
            const errMsg =
              error.response.data.errors[0].message === undefined
                ? error.response.data.errors[0].msg
                : error.response.data.errors[0].message

            showMessage({
              message: errMsg,
              type: 'danger',
              position: 'bottom'
            })
          } else {
            error.handleGlobally && error.handleGlobally()
          }
        })
      dispatch(changeState(false))
    }

    // setRoomName(userDetails.name + '-' + profile.personal_info.name)
    // setMembers([userDetails._id, profile.user_id])

    // console.log('members----1break1', members, 'name', roomName)
    // const values = {
    //   roomName: userDetails.name + ' - ' + profile.personal_info.name,
    //   members: [userDetails._id, profile.user_id]
    // }
    // console.log(values)

    if (roomName.length === 0 && members.length === 0) {
      setRoomName(profile.personal_info.name)
      setMembers([userDetails._id, profile.user_id])

      console.log('members----1break1', members, 'name', roomName)
      
      const values = {
        roomName: roomName,
        members: members
      }
      console.log(values)

      dispatch(changeState(true))
      await axiosInstance
        .post('/api/chats/create', values)
        .then((res) => {
          console.log(res)
          showMessage({
            message: res.data.message,
            type: 'success',
            position: 'bottom'
          })
        })
        .catch((error) => {
          const statusCode = error.response ? error.response.status : null
          if (statusCode === 500 || statusCode === 400) {
            const errMsg =
              error.response.data.errors[0].message === undefined
                ? error.response.data.errors[0].msg
                : error.response.data.errors[0].message

            showMessage({
              message: errMsg,
              type: 'danger',
              position: 'bottom'
            })
          } else {
            error.handleGlobally && error.handleGlobally()
          }
        })
      dispatch(changeState(false))
    }
    console.log('members----1break1', members, 'name', roomName)

    navigation.navigate('Messaging', {
      // _id: item._id,
      // room_name: item.room_name,
      // messages: item.messages
    })
    console.log('userdetails ---->123-1 name:--', userDetails)
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
