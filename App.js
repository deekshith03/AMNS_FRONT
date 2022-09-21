import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Provider } from 'react-redux'
import Loader from './app/components/atoms/Loader.component'
import StackNavigator from './app/navigator/StackNavigator'
import { store } from './app/redux/store'

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Loader />
        <StackNavigator />
      </Provider>
    </NavigationContainer>
  )
}
