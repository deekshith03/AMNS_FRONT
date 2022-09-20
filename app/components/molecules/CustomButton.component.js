import PropTypes from 'prop-types'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import globalStyles from '../../styles/global.styles'

const CustomButton = ({ text, handleClick }) => {
  return (
    <TouchableOpacity
      style={globalStyles.globalStyles.buttonStyle}
      onPress={handleClick}>
      <Text style={globalStyles.globalStyles.LandingFontStyle}>{text}</Text>
    </TouchableOpacity>
  )
}

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.any
}

export default CustomButton
