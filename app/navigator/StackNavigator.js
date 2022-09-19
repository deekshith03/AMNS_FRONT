import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import AuthScreen from '../screens/AuthScreen.screen'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator
