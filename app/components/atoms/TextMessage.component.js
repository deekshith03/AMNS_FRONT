import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import globalStyles from '../../styles/global.styles'
import { colors } from '../../variables/colors.variables'

const TextMessage = ({ item, author }) => {
  const { userDetails } = useSelector((state) => state.userDetails)

  const status = userDetails._id != author
  return (
    <View
      style={
        status
          ? styles.messageWrapper
          : [styles.messageWrapper, { alignItems: 'flex-end' }]
      }>
      <View style={globalStyles.flexRow}>
        <View style={styles.mmessage}>
          <Text style={styles.msg}>{item.message}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>
              {new Date(item.timestamp).getHours()}
              {':'}
              {String(new Date(item.timestamp).getMinutes()).padStart(2, '0')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  messageWrapper: {
    alignItems: 'flex-start',
    width: '100%'
  },
  mmessage: {
    backgroundColor: colors.logingray,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 10,
    maxWidth: '90%'
  },
  msg: {
    fontFamily: 'Roboto',
    fontSize: 16,
    marginHorizontal: 10,
    marginTop: 10
  },
  time: {
    fontSize: 12,
    opacity: 0.7
  },
  timeContainer: {
    alignItems: 'flex-end',
    marginBottom: 5,
    marginRight: 15
  }
})

TextMessage.propTypes = {
  item: PropTypes.object,
  author: PropTypes.number
}

export default TextMessage
