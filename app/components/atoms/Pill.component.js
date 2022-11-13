import { Text, Pressable, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { colors } from '../../variables/colors.variables'
import PropTypes from 'prop-types'

const width = Dimensions.get('window').width

const Pill = ({
  text,
  handleClick,
  alignItems = 'center',
  backgroundColor,
  paddingVertical,
  paddingHorizontal,
  borderRadius,
  justifyContent = 'center',
  fontColor,
  fontFamily = 'Roboto',
  fontSize = 20,
  textTransform = null,
  marginRight = 10,
  marginBottom = 10,
  closeFlag = false
}) => {
  const btnBgColor = backgroundColor ? backgroundColor : colors.black
  const btnTextColor = fontColor ? colors.white : fontColor
  const styles = StyleSheet.create({
    fontStyle: {
      color: btnTextColor,
      fontFamily: fontFamily,
      fontSize: fontSize,
      textTransform: textTransform ? textTransform : 'none'
    },
    iconStyles: {
      marginLeft: 1
    },
    pillStyle: {
      alignItems: alignItems,
      backgroundColor: btnBgColor,
      borderRadius: borderRadius,
      display: 'flex',
      elevation: 8,
      flexDirection: 'row',
      justifyContent: justifyContent,
      marginBottom: marginBottom,
      marginRight: marginRight,
      maxWidth: closeFlag ? width / 4 : 'auto',
      paddingHorizontal: paddingHorizontal,
      paddingVertical: paddingVertical
    }
  })
  return (
    <>
      <Pressable style={styles.pillStyle} onPress={handleClick}>
        <Text style={styles.fontStyle}>{text}</Text>
        {!closeFlag ? (
          <Feather
            name="x"
            size={18}
            color={colors.white}
            style={styles.iconStyles}
          />
        ) : null}
      </Pressable>
    </>
  )
}

Pill.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleClick: PropTypes.func,
  alignItems: PropTypes.string,
  backgroundColor: PropTypes.string,
  paddingVertical: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  borderRadius: PropTypes.number,
  justifyContent: PropTypes.string,
  fontColor: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  textTransform: PropTypes.string,
  marginRight: PropTypes.number,
  marginBottom: PropTypes.number,
  closeFlag: PropTypes.bool
}

export default Pill
