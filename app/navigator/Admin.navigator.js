import { Feather } from '@expo/vector-icons'
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { AddStaff } from '../screens/admin/AddStaff.admin.screen'
import { Mailer } from '../screens/Mailer.screen'
import { SearchScreenAdmin } from '../screens/searchScreenAdmin.screen'
import globalStyles from '../styles/global.styles'
import { colors } from '../variables/colors.variables'
const AdminNav = createDrawerNavigator()

import * as RootNavigation from './RootNavigation.navigator'
const navigateTo = (screen) => {
  RootNavigation.navigate(screen)
}

const notificationIcon = () => {
  return (
    <TouchableOpacity onPress={() => navigateTo('NotificationScreen')}>
      <Feather name="bell" size={26} style={globalStyles.mh10} />
    </TouchableOpacity>
  )
}

const logoutIcon = () => {
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

const options = {
  headerTransparent: true,
  headerRight: () => (
    <View style={[globalStyles.dflex, globalStyles.flexRow]}>
      {notificationIcon()}
      {logoutIcon()}
    </View>
  )
}

export const AdminNavigator = () => {
  return (
    <AdminNav.Navigator initialRouteName="Search">
      <AdminNav.Screen
        name="AddStaff"
        component={AddStaff}
        options={{
          ...options,
          title: 'Add Staff'
        }}
      />
      <AdminNav.Screen
        name="Search"
        component={SearchScreenAdmin}
        options={{
          ...options,
          title: 'Search'
        }}
      />
      <AdminNav.Screen
        name="Mailer"
        component={Mailer}
        options={{
          ...options,
          title: 'Send Mail'
        }}
      />
    </AdminNav.Navigator>
  )
}
