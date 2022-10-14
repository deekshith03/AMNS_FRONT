import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { AddStaff } from '../screens/admin/AddStaff.admin.screen'

const AdminNav = createNativeStackNavigator()

export const AdminNavigator = () => {
  return (
    <AdminNav.Navigator initialRouteName="AddStaff">
      <AdminNav.Screen
        name="AddStaff"
        component={AddStaff}
        options={{ headerShown: false }}
      />
    </AdminNav.Navigator>
  )
}
