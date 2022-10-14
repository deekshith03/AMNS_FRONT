import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'

export const SideBar = ({ type }) => {
  console.log(type)
  return <View></View>
}

SideBar.propTypes = {
  type: PropTypes.string.isRequired
}
