import { store } from './app/redux/store'
import { Provider } from 'react-redux'
import { StrictMode } from 'react'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './app/navigator/StackNavigator'

export default function App() {
  return (
    <StrictMode>
      <NavigationContainer>
        <Provider store={store}>
          <StackNavigator />
        </Provider>
      </NavigationContainer>
    </StrictMode>
  )
}
