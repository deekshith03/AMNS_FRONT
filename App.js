import { store } from './app/redux/store'
import { Provider } from 'react-redux'
import Counter from './app/components/Counter'
import { StrictMode } from 'react'
import React from 'react'

export default function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <Counter />
      </Provider>
    </StrictMode>
  )
}
