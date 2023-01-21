import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { navigateTo } from '../helpers/navigation.helper'
import globalStyles from '../styles/global.styles'
import { colors } from './colors.variables'

export const noInternetImage = require('../assets/no-internet.jpg')
export const serverDownImage = require('../assets/serverDown.jpg')

export const notificationIcon = () => {
  return (
    <TouchableOpacity onPress={() => navigateTo('NotificationScreen')}>
      <Feather name="bell" size={26} style={globalStyles.mh10} />
    </TouchableOpacity>
  )
}

export const logoutIcon = () => {
  return (
    <TouchableOpacity onPress={() => navigateTo('AuthScreen')}>
      <Feather
        name="log-out"
        size={26}
        style={globalStyles.mh10}
        color={colors.red}
      />
    </TouchableOpacity>
  )
}