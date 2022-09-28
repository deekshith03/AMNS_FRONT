import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useDispatch } from 'react-redux'
import { isConnected } from '../redux/slices/Internet.slice'
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
      initialRouteName={'AuthScreen'}
      navigationRef={navigationRef}>
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="NoInternetScreen" component={NoInternet} />
      <Stack.Screen name="serverDownScreen" component={ServerDown} />
    </Stack.Navigator>
  )
}

export default StackNavigator
