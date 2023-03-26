import * as SecureStore from 'expo-secure-store'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SideBar } from '../components/organisms/SideBar'
import * as RootNavigation from '../navigator/RootNavigation.navigator'
import { setUserDetails } from '../redux/slices/userDetails.slice'
export const Home = () => {
  const [type, setType] = useState('admin')

  const dispatch = useDispatch()
  dispatch(setUserDetails)

  useEffect(() => {
    async function navigate() {
      const type = await SecureStore.getItemAsync('type')
      if (type === null) {
        RootNavigation.navigate('AuthScreen')
      } else {
        setType(type)
      }
    }
    navigate()
  })
  return <SideBar type={type} />
}
