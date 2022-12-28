import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import globalStyles from '../../styles/global.styles'
import PropTypes from 'prop-types'

const CenteredMessage = ({ title, message }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={[globalStyles.h1, globalStyles.textAlignCenter]}>
        {title}
      </Text>
      <Text
        style={[
          globalStyles.textAlignCenter,
          globalStyles.p,
          globalStyles.font300
        ]}>
        {message}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '80%'
  }
})

CenteredMessage.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string
}

export default CenteredMessage
