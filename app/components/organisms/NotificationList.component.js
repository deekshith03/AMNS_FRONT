import { Feather } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import globalStyles from '../../styles/global.styles'
import { colors } from '../../variables/colors.variables'

const NotificationList = ({ notification }) => {
  const [notifications, setNotifications] = useState(notification)

  const markRead = (id) => {
    // notification[id].read = true
    setNotifications(
      notifications.map((item) => {
        return item.id === id ? { ...item, read: true } : item
      })
    )
  }

  notifications.sort((a, b) => b.time.getTime() - a.time.getTime())
  const DATA = [
    {
      title: 'Today',
      data: notifications.filter((item) => {
        return new Date().getDate() === item.time.getDate()
      })
    },
    {
      title: 'Earlier',
      data: notifications.filter((item) => {
        return new Date().getDate() > item.time.getDate()
      })
    }
  ]

  return !notifications.length ? (
    <View style={styles.textContainer}>
      <Text style={[globalStyles.h1, globalStyles.textAlignCenter]}>
        No Notifications
      </Text>
      <Text
        style={[
          globalStyles.textAlignCenter,
          globalStyles.p,
          globalStyles.font300
        ]}>
        Please come back later to see what you have got.
      </Text>
    </View>
  ) : (
    <View>
      <SectionList
        sections={DATA}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>
            {section.data.length ? section.title : <View />}
          </Text>
        )}
        renderItem={(item) => {
          const Notification = item.item
          return (
            <TouchableOpacity
              onPress={() => !item.read && markRead(Notification.id)}>
              <View style={styles.container}>
                <View style={styles.feather}>
                  <Feather name="mail" size={18} />
                </View>

                <View style={styles.content}>
                  <View style={styles.text}>
                    <Text
                      style={
                        !Notification.read ? styles.unReadTitle : styles.title
                      }>
                      {Notification.title}
                    </Text>

                    <Text
                      style={
                        !Notification.read
                          ? styles.unReadDescription
                          : styles.description
                      }>
                      {Notification.description}
                    </Text>
                  </View>

                  <Text style={styles.time}>
                    {Notification.time.toLocaleString()}
                  </Text>
                </View>

                <TouchableOpacity>
                  <Feather name="more-vertical" size={17} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )
        }}></SectionList>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingBottom: 3,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 3
  },
  content: {
    flex: 1,
    marginHorizontal: 10,
    paddingBottom: 8
  },
  description: {
    fontSize: 13,
    letterSpacing: 0.5
  },
  feather: {
    padding: 3
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    paddingHorizontal: 15,
    paddingVertical: 3
  },
  text: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5
  },
  textContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '80%'
  },
  time: {
    color: colors.lightGrey,
    fontSize: 11
  },
  title: {
    color: colors.textColor_dark,
    fontSize: 16,
    fontWeight: '400'
  },
  unReadDescription: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5
  },
  unReadTitle: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '600'
  }
})

NotificationList.propTypes = {
  notification: PropTypes.array.isRequired
}

export default NotificationList
