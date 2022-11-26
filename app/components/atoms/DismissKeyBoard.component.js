import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
const DismissKeyBoard = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  )
}

DismissKeyBoard.propTypes = {
  children: PropTypes.any.isRequired
}

export default DismissKeyBoard
