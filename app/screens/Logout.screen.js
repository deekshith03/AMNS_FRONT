import { useEffect } from "react"
import * as RootNavigation from '../navigator/RootNavigation.navigator'
export const Logout = () => {
  useEffect(() => {
    RootNavigation.navigate('AuthScreen')
  })
  return
}