import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useDispatch } from 'react-redux'
import { isConnected } from '../redux/slices/Internet.slice'
import { AdminDashboard } from '../screens/Admin.screen'
import AuthScreen from '../screens/AuthScreen.screen'
import { NoInternet } from '../screens/NoInternet.screen'
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
      initialRouteName={'adminDashboard'}
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
        name="adminDashboard"
        component={AdminDashboard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator
