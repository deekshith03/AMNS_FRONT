import { Feather } from '@expo/vector-icons'
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { AddStaff } from '../screens/admin/AddStaff.admin.screen'
import globalStyles from '../styles/global.styles'

const AdminNav = createDrawerNavigator()

const notificationIcon = () => {
  return (
    <TouchableOpacity>
      <Feather name="bell" size={26} style={globalStyles.mh10} />
    </TouchableOpacity>
  )
}

const options = {
  headerTransparent: true,
  headerRight: () => notificationIcon(),
  title: 'Add Staff'
}

export const AdminNavigator = () => {
  return (
    <AdminNav.Navigator initialRouteName="AddStaff">
      <AdminNav.Screen
        name="AddStaff"
        component={AddStaff}
        options={{
          ...options,
          title: 'Add Staff'
        }}
      />
      <AdminNav.Screen
        name="Students"
        component={AddStaff}
        options={{
          ...options,
          title: 'Students'
        }}
      />
    </AdminNav.Navigator>
  )
}
