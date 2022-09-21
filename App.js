import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Provider } from 'react-redux'
import StackNavigator from './app/navigator/StackNavigator'
import { store } from './app/redux/store'
import FlashMessage from 'react-native-flash-message'

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <StackNavigator />
      </Provider>
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}
