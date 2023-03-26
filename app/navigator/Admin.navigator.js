import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { View } from 'react-native'
import PostInput from '../components/organisms/PostInput.component'
import { AddStaff } from '../screens/admin/AddStaff.admin.screen'
import { AddStudent } from '../screens/admin/AddStudent.admin.screen'
import Chat from '../screens/Chat.screen'
import Feeds from '../screens/Feeds.screen'
import { ImportScreen } from '../screens/ImportScreen.screen'
import { Mailer } from '../screens/Mailer.screen'
import { SearchScreenAdmin } from '../screens/searchScreenAdmin.screen'
import globalStyles from '../styles/global.styles'
import { logoutIcon, notificationIcon } from '../variables/icon.variables'
const AdminNav = createDrawerNavigator()

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
        name="AddStudent"
        component={AddStudent}
        options={{
          ...options,
          title: 'Add Student'
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
      <AdminNav.Screen
        name="Import"
        component={ImportScreen}
        options={{ ...options, title: 'Import Data' }}
      />
      <AdminNav.Screen
        name="Feeds"
        component={Feeds}
        options={{
          ...options,
          title: 'Feeds'
        }}
      />
      <AdminNav.Screen
        name="Create Post"
        component={PostInput}
        options={{
          ...options,
          title: 'Add Post'
        }}
      />
      <AdminNav.Screen
        name="Chat"
        component={Chat}
        options={{
          ...options,
          title: 'Chats'
        }}
      />
    </AdminNav.Navigator>
  )
}
