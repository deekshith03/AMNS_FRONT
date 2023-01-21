import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { getNotification } from '../apis/notification.api'
import NotificationList from '../components/organisms/NotificationList.component'
import globalStyles from '../styles/global.styles'
import { apiWrapper } from '../utils/wrapper.api'
import { colors } from '../variables/colors.variables'

const Notification = () => {
  const { notificationList } = useSelector((state) => state.notificationList)
  if (notificationList.length === 0) {
    apiWrapper(getNotification)
  }

  return (
    <View style={[globalStyles.flexColumn, styles.container]}>
      <NotificationList notification={notificationList} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    height: '100%',
    paddingTop: 3,
    width: '100%'
  }
})

export default Notification
