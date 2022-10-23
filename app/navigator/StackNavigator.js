import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useDispatch } from 'react-redux'
import { isConnected } from '../redux/slices/Internet.slice'
import AuthScreen from '../screens/AuthScreen.screen'
import { Home } from '../screens/Home'
import { NoInternet } from '../screens/NoInternet.screen'
import Notification from '../screens/Notification.screen'
import { ServerDown } from '../screens/ServerDown.screen'
import { navigationRef } from './RootNavigation.navigator'

const Stack = createNativeStackNavigator()

export function navigate(name, params) {
  if (Stack.isReady()) {
    Stack.navigate(name, params)
  }
}

const StackNavigator = () => {
  const dispatch = useDispatch()
  dispatch(isConnected())

  return (
    <Stack.Navigator
      initialRouteName={'NotificationScreen'}
      navigationRef={navigationRef}>
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NoInternetScreen"
        component={NoInternet}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="serverDownScreen"
        component={ServerDown}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={Notification}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator
