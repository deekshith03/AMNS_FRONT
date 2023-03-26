import { createDrawerNavigator } from "@react-navigation/drawer"
import React from 'react'
import { View } from "react-native"
import PostInput from "../components/organisms/PostInput.component"
import Feeds from "../screens/Feeds.screen"
import { SearchScreen } from "../screens/SearchScreen.screen"
import globalStyles from "../styles/global.styles"
import { logoutIcon, notificationIcon } from "../variables/icon.variables"

const StudentNav = createDrawerNavigator()

const options = {
  headerTransparent: true,
  headerRight: () => (
    <View style={[globalStyles.dflex, globalStyles.flexRow]}>
      {notificationIcon()}
      {logoutIcon()}
    </View>
  )
}

export const StudentNavigator = () => {
  return (
    <StudentNav.Navigator initialRouteName="Feeds">
      <StudentNav.Screen
        name="Feeds"
        component={Feeds} options={{
          ...options,
          title: 'Feeds'
        }}
      />
      <StudentNav.Screen
        name="Search"
        component={SearchScreen}
        options={{
          ...options,
          title: 'Search'
        }}
      />
      <StudentNav.Screen 
        name="Create Post"
        component={PostInput}
        options={{
          ...options,
          title: 'Add Post'
        }}
      />
    </StudentNav.Navigator>
  )
}
