import * as SecureStore from 'expo-secure-store'
import React, { useEffect, useState } from 'react'
import { SideBar } from '../components/organisms/SideBar'
import * as RootNavigation from '../navigator/RootNavigation.navigator'
export const Home = () => {
  const [type, setType] = useState('admin')
  useEffect(() => {
    async function navigate() {
      const type = await SecureStore.getItemAsync('type')
      if (type === null) {
        RootNavigation.navigate('AuthScreen')
      }
      else {
        setType(type)
      }
    }
    navigate()
  })
  return <SideBar type={type} />
}
