import PropTypes from 'prop-types'
import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../variables/colors.variables'

const width = Dimensions.get('window').width

const CustomButton = ({
  text,
  handleClick,
  alignItems = 'center',
  backgroundColor,
  bordered = false,
  size,
  fontColor,
  fontFamily = 'Roboto',
  fontSize = 20,
  textTransform = 'capitalize',
  justifyContent = 'center',
  paddingHorizontal,
  paddingVertical
}) => {
  const large = width / 1.3
  const small = width / 2
  const btnSize = size === 'large' ? large : small
  const btnBgColor = backgroundColor ? backgroundColor : colors.black
  const btnTextColor = fontColor ? colors.white : fontColor
  const btnBorderRadius = bordered ? 30 : 5

  const styles = StyleSheet.create({
    buttonStyle: {
      alignItems: alignItems,
      backgroundColor: btnBgColor,
      borderRadius: btnBorderRadius,
      elevation: 8,
      justifyContent: justifyContent,
      paddingHorizontal: paddingHorizontal,
      paddingVertical: paddingVertical,
      width: btnSize
    },
    fontStyle: {
      color: btnTextColor,
      fontFamily: fontFamily,
      fontSize: fontSize,
      textTransform: textTransform
    }
  })

  return (
    <>
      <TouchableOpacity style={styles.buttonStyle} onPress={handleClick}>
        <Text style={styles.fontStyle}>{text}</Text>
      </TouchableOpacity>
    </>
  )
}

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  alignItems: PropTypes.string,
  backgroundColor: PropTypes.string,
  bordered: PropTypes.bool,
  size: PropTypes.string,
  fontColor: PropTypes.string,
  fontFamily: PropTypes.string,
  textTransform: PropTypes.string,
  justifyContent: PropTypes.string,
  fontSize: PropTypes.number,
  padd: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  paddingVertical: PropTypes.number
}

export default CustomButton
