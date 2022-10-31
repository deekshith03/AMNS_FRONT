import React from 'react'
import { StyleSheet, View } from 'react-native'
import NotificationList from '../components/organisms/NotificationList.component'
import { notificationData } from '../data/notification.sample'
import globalStyles from '../styles/global.styles'
import { colors } from '../variables/colors.variables'

const notification = notificationData

const Notification = () => {
  return (
    <View style={[globalStyles.flexColumn, styles.container]}>
      <NotificationList notification={notification} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    height: '100%',
    paddingTop: 5,
    width: '100%'
  }
})

export default Notification
