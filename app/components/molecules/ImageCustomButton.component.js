import { Feather } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import globalStyles from '../../styles/global.styles.js'
import { colors } from '../../variables/colors.variables.js'

const ImageCustomButton = ({ text, iconName, flag, handleShowingSignUp }) => {
  let bgColor =
    flag === true
      ? [styles.switchBtn, styles.backGroundStylePink]
      : [styles.switchBtn]
  let textColor =
    flag === true
      ? [globalStyles.LandingFontStyle, styles.fontStyles]
      : [globalStyles.LandingFontStyle, styles.fontColor, styles.fontStyles]

  return (
    <View>
      <TouchableOpacity
        style={[bgColor]}
        onPress={() => (flag === false ? handleShowingSignUp() : null)}>
        <View style={styles.btnContainer}>
          <Feather
            name={iconName}
            size={16}
            color={flag === true ? 'white' : 'black'}
            style={styles.iconStyles}
          />
          <Text style={textColor}>{text}</Text>
        </View>
      </TouchableOpacity>
      {flag === true ? <View style={styles.triangle}></View> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  backGroundStylePink: {
    backgroundColor: colors.loginpink
  },
  btnContainer: { flex: 1, flexDirection: 'row' },
  fontColor: {
    color: colors.black
  },
  fontStyles: {
    fontSize: 15
  },
  iconStyles: { paddingRight: 5, paddingTop: 2 },
  switchBtn: {
    backgroundColor: colors.logingray,
    borderRadius: 30,
    elevation: 8,
    height: 42,
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: 130
  },
  triangle: {
    backgroundColor: colors.transparent,
    borderBottomColor: colors.loginpink,
    borderBottomWidth: 12,
    borderLeftColor: colors.transparent,
    borderLeftWidth: 12,
    borderRightColor: colors.transparent,
    borderRightWidth: 12,
    borderStyle: 'solid',
    borderTopColor: colors.transparent,
    borderTopWidth: 0,
    bottom: 52,
    height: 0,
    left: 50,
    position: 'relative',
    width: 0
  }
})

ImageCustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  flag: PropTypes.bool.isRequired,
  handleShowingSignUp: PropTypes.func.isRequired
}

export default ImageCustomButton
