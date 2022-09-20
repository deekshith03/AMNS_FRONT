import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import globalStyles from '../styles/global.styles'
import PropTypes from 'prop-types'

const CustomButton = ({ text }) => {
  return (
    <TouchableOpacity style={globalStyles.globalStyles.buttonStyle}>
      <Text style={globalStyles.globalStyles.LandingFontStyle}>{text}</Text>
    </TouchableOpacity>
  )
}

CustomButton.propTypes = {
  text: PropTypes.string.isRequired
}

export default CustomButton
