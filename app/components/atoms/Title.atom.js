import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import globalStyles from '../../styles/global.styles'
import { colors } from '../../variables/colors.variables'
export const Title = ({ text }) => {
  return (
    <View style={[globalStyles.dflex, globalStyles.flexRow]}>
      <View style={styles.bar} />
      <Text style={[globalStyles.h1]}>{text}</Text>
    </View>
  )
}

Title.propTypes = {
  text: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.loginpink,
    height: 25,
    margin: 5,
    width: 7
  }
})
