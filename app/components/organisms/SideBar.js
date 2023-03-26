import PropTypes from 'prop-types'
import React from 'react'
import { AdminNavigator } from '../../navigator/Admin.navigator'
import { StaffNavigator } from '../../navigator/Staff.navigator'
import { StudentNavigator } from '../../navigator/Student.navigator'

export const SideBar = ({ type }) => {


  return type === 'admin' && <AdminNavigator /> || type === 'staff' && <StaffNavigator /> || <StudentNavigator />
}

SideBar.propTypes = {
  type: PropTypes.string.isRequired
}
