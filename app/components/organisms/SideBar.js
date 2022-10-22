import PropTypes from 'prop-types'
import React from 'react'
import { AdminNavigator } from '../../navigator/Admin.navigator'

export const SideBar = ({ type }) => {
  // console.log(type)
  return type === 'admin' && <AdminNavigator />
}

SideBar.propTypes = {
  type: PropTypes.string.isRequired
}
