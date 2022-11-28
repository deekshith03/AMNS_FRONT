import { Feather } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
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
  paddingVertical,
  customWidth,
  icon
}) => {
  const large = width / 1.3
  const small = width / 6
  const btnSize = customWidth ? customWidth : (size === 'large' ? large : small)
  const btnBgColor = backgroundColor ? backgroundColor : colors.black
  const btnTextColor = fontColor ? colors.white : fontColor
  const btnBorderRadius = bordered ? 30 : 5

  const styles = StyleSheet.create({
    buttonStyle: {
      alignItems: alignItems,
      backgroundColor: btnBgColor,
      borderRadius: btnBorderRadius,
      display: 'flex',
      elevation: 8,
      flexDirection: 'row',
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
    },
    icon: {
      height: 24,
      left: 8,
      width: 24,
      zIndex: -1
    },
  })

  return (
    <>
      <TouchableOpacity style={styles.buttonStyle} onPress={handleClick}>
        <Text style={styles.fontStyle}>{text}</Text>
        {icon !== undefined && (
          <Feather
            name={icon}
            size={24}
            color={btnTextColor}
            style={styles.icon}
          />
        )}
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
  paddingVertical: PropTypes.number,
  customWidth: PropTypes.number,
  icon: PropTypes.string
}

export default CustomButton
