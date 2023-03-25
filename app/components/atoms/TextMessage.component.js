import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../variables/colors.variables'
import PropTypes from 'prop-types'
import globalStyles from '../../styles/global.styles'


const TextMessage = ({ item, author }) => {
  console.log('aaaa--aa---',item,'bbb---bbb', author)
  const status = item.author != author
  return (
    <View>
      <View
        style={
          status
            ? styles.messageWrapper
            : [styles.messageWrapper, { alignItems: 'flex-end' }]
        }>
        <View style={globalStyles.flexRow}>
          <View
            style={
              status
                ? styles.mmessage
                : [styles.mmessage, { backgroundColor: 'rgb(194, 243, 194)' }]
            }>
            <Text>{item.message}</Text>
          </View>
        </View>
        <Text>{item.timestamp}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  messageWrapper: {
    alignItems: 'flex-start',
    marginBottom: 15,
    width: '100%'
  },
  mmessage: {
    backgroundColor: colors.notificationTile,
    borderRadius: 10,
    marginBottom: 2,
    maxWidth: '50%',
    padding: 15
  }
})

TextMessage.propTypes = {
  item: PropTypes.object,
  author: PropTypes.string
}

export default TextMessage
