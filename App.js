import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import FlashMessage from 'react-native-flash-message'
import { Provider } from 'react-redux'
import Loader from './app/components/atoms/Loader.component'
import { navigationRef } from './app/navigator/RootNavigation.navigator'
import StackNavigator from './app/navigator/StackNavigator'
import { store } from './app/redux/store'

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <Loader />
        <StackNavigator />
      </Provider>
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}
