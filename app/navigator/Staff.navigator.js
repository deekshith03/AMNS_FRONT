import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { View } from 'react-native'
import PostInput from '../components/organisms/PostInput.component'
import Feeds from '../screens/Feeds.screen'
import { Mailer } from '../screens/Mailer.screen'
import { SearchScreenAdmin } from '../screens/searchScreenAdmin.screen'
import globalStyles from '../styles/global.styles'
import { logoutIcon, notificationIcon } from '../variables/icon.variables'
const StaffNav = createDrawerNavigator()

const options = {
  headerTransparent: true,
  headerRight: () => (
    <View style={[globalStyles.dflex, globalStyles.flexRow]}>
      {notificationIcon()}
      {logoutIcon()}
    </View>
  )
}

export const StaffNavigator = () => {
  return (
    <StaffNav.Navigator initialRouteName="Feeds">
      <StaffNav.Screen
        name="Search"
        component={SearchScreenAdmin}
        options={{
          ...options,
          title: 'Search'
        }}
      />
      <StaffNav.Screen
        name="Mailer"
        component={Mailer}
        options={{
          ...options,
          title: 'Send Mail'
        }}
      />
      <StaffNav.Screen
        name="Feeds"
        component={Feeds}
        options={{
          ...options,
          title: 'Feeds'
        }}
      />
      <StaffNav.Screen
        name="Create Post"
        component={PostInput}
        options={{
          ...options,
          title: 'Add Post'
        }}
      />
    </StaffNav.Navigator>
  )
}
