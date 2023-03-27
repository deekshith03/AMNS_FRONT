import * as SecureStore from 'expo-secure-store'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserDetails } from '../apis/profile.api'
import { SideBar } from '../components/organisms/SideBar'
import * as RootNavigation from '../navigator/RootNavigation.navigator'
import { setUserDetails } from '../redux/slices/userDetails.slice'
import { apiWrapper } from '../utils/wrapper.api'
export const Home = () => {
  const [type, setType] = useState('admin')

  const dispatch = useDispatch()

  const success_fun = (data) => {
    dispatch(setUserDetails(data))
  }
  apiWrapper(getUserDetails, success_fun)

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
