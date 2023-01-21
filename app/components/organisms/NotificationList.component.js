import { Feather } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import {
  Modal,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import globalStyles from '../../styles/global.styles'
import { colors } from '../../variables/colors.variables'
import CenteredMessage from '../atoms/CenteredMessage.component'
import CustomButton from '../atoms/CustomButton.component'

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5
  },
  containerUnread: {
    backgroundColor: colors.notificationTile,
    borderRadius: 15
  },
  content: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 3
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginEnd: 10
  },
  feather: {
    marginLeft: 5,
    marginVertical: 10
  },
  modalBody: {
    marginHorizontal: 5,
    padding: 5
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 10,
    margin: 10,
    maxHeight: 300,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: colors.textColor,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
    padding: 6
  },
  time: {
    color: colors.lightGrey,
    fontSize: 12
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1
  },
  unReadTitle: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1
  }
})

const NotificationList = ({ notification }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [notifications, setNotifications] = useState([...notification])

  const markRead = async (id) => {
    try {
      setNotifications(
        notifications.map((item) => {
          return item._id === id ? { ...item, read: true } : item
        })
      )
    } catch (err) {
      console.log(err)
    }
  }

  notifications.sort(
    (a, b) =>
      new Date(b.notification.time).getTime() -
      new Date(a.notification.time).getTime()
  )

  const date = new Date(),
    yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  const DATA = [
    {
      title: 'Today',
      data: notifications.filter((item) => {
        return date.getDate() === new Date(item.notification.time).getDate()
      })
    },
    {
      title: 'Yesterday',
      data: notifications.filter((item) => {
        return (
          yesterday.getDate() === new Date(item.notification.time).getDate()
        )
      })
    },
    {
      title: 'Earlier',
      data: notifications.filter((item) => {
        return (
          date.getDate() !== new Date(item.notification.time).getDate() &&
          yesterday.getDate() !== new Date(item.notification.time).getDate()
        )
      })
    }
  ]

  return !notifications.length ? (
    <CenteredMessage
      title={'No Notifications'}
      message={
        'Please come back later to see what you have got.'
      }></CenteredMessage>
  ) : (
    <View>
      <SectionList
        sections={DATA}
        renderSectionHeader={({ section }) => (
          <Text style={[styles.sectionHeader, globalStyles.textAlignCenter]}>
            {section.data.length ? section.title : <View />}
          </Text>
        )}
        renderItem={(item) => {
          const Notification = item.item
          return (
            <TouchableOpacity
              onPress={() => {
                !Notification.read && markRead(Notification._id),
                  setSelectedItem(Notification),
                  setModalVisible(!modalVisible)
              }}>
              <View
                style={[
                  !Notification.read
                    ? [styles.container, styles.containerUnread]
                    : [styles.container]
                ]}>
                <View style={styles.feather}>
                  <Feather name="mail" size={24} color={'grey'} />
                </View>

                <View style={styles.content}>
                  <View style={[styles.contentHeader, globalStyles.mv5]}>
                    <Text
                      style={
                        !Notification.read ? styles.unReadTitle : styles.title
                      }>
                      {Notification.notification.title}
                    </Text>
                    <Text style={styles.time}>
                      {new Date(Notification.notification.time).getHours()}
                      {':'}
                      {String(
                        new Date(Notification.notification.time).getMinutes()
                      ).padStart(2, '0')}
                    </Text>
                  </View>

                  <Text
                    numberOfLines={3}
                    ellipsizeMode="tail"
                    style={
                      !Notification.read
                        ? [globalStyles.p, globalStyles.font500]
                        : globalStyles.p
                    }>
                    {Notification.notification.description}
                  </Text>

                  <Text style={styles.time}>
                    {new Date(
                      Notification.notification.time
                    ).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}></SectionList>
      {selectedItem ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={[globalStyles.h1, globalStyles.mv5]}>
                {selectedItem.notification.title}
              </Text>
              <ScrollView>
                <Text style={[globalStyles.p, styles.modalBody]}>
                  {selectedItem.notification.description}
                </Text>
              </ScrollView>
              <View style={globalStyles.mv5}>
                <CustomButton
                  text="Close"
                  alignItems={'center'}
                  backgroundColor={colors.loginpink}
                  fontColor={colors.white}
                  fontFamily={'Roboto'}
                  fontSize={14}
                  paddingHorizontal={5}
                  paddingVertical={10}
                  handleClick={() => {
                    setModalVisible(!modalVisible)
                  }}
                  size={'small'}
                  bordered={true}
                />
              </View>
            </View>
          </View>
        </Modal>
      ) : (
        <></>
      )}
    </View>
  )
}

NotificationList.propTypes = {
  notification: PropTypes.array.isRequired
}
export default NotificationList
