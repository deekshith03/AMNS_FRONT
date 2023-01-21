import PropTypes from 'prop-types'
import React from 'react'
import { AdminNavigator } from '../../navigator/Admin.navigator'
import { StaffNavigator } from '../../navigator/Staff.navigator'

export const SideBar = ({ type }) => {
  // console.log(type)
  return type === 'admin' && <AdminNavigator /> || type === 'staff' && <StaffNavigator />
}

SideBar.propTypes = {
  type: PropTypes.string.isRequired
}
