import { Feather } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import NotificationList from '../components/organisms/NotificationList.component'
import globalStyles from '../styles/global.styles'
import { colors } from '../variables/colors.variables'

const notification = []

const Notification = () => {
  return (
    <View style={[globalStyles.flexColumn, styles.container]}>
      <View style={[styles.header, globalStyles.flexRow, globalStyles.w100]}>
        <TouchableOpacity>
          <Feather
            name="arrow-left"
            size={26}
            color={colors.black}
            style={[globalStyles.mh10, globalStyles.mv5]}></Feather>
        </TouchableOpacity>
        <Text style={globalStyles.screenHeader}>Notifications</Text>
      </View>
      <NotificationList notification={notification} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    height: '100%',
    paddingBottom: 40,
    paddingTop: 40,
    width: '100%'
  },
  header: {
    alignContent: 'center',
    justifyContent: 'flex-start',
    padding: 3
  }
})

export default Notification
