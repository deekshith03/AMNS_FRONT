import PropTypes from 'prop-types'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import globalStyles from '../../styles/global.styles'

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
    height: Dimensions.get('window').height - 100,
    justifyContent: 'center',
    width: '80%'
  }
})

CenteredMessage.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string
}

export default CenteredMessage
