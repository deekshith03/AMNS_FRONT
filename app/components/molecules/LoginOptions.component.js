import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import globalStyles from '../../styles/global.styles.js'
import { colors } from '../../variables/colors.variables.js'
const LoginOptions = () => {
  return (
    <View style={styles.body}>
      <Text
        style={[
          globalStyles.globalStyles.LandingFontStyle,
          styles.fontSize,
          styles.fontColor
        ]}>
        Or
      </Text>
      <Text
        style={[globalStyles.globalStyles.LandingFontStyle, styles.fontColor]}>
        Login With
      </Text>
      <View styles={styles.imageStyles}>
        <FontAwesome5 name="microsoft" size={30} color={colors.loginpink} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 50,
    paddingLeft: 35,
    paddingRight: 35,
    zIndex: 1
  },
  fontColor: {
    color: colors.black
  },
  fontSize: {
    fontSize: 30
  },
  imageStyles: {
    paddingVertical: 150
  }
})

export default LoginOptions
