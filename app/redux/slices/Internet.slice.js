import NetInfo from '@react-native-community/netinfo'
import { createSlice } from '@reduxjs/toolkit'
import * as RootNavigation from '../../navigator/RootNavigation.navigator'

const initialState = {
  value: false
}

const CheckInternetSlice = createSlice({
  name: 'isConnected',
  initialState,
  reducers: {
    isConnected: () => {
      NetInfo.addEventListener((state) => {
        const online = state.isConnected && state.isInternetReachable
        // console.log(online)
        if (!online) {
          RootNavigation.navigate('NoInternetScreen')
        }
      })
    }
  }
})

export const { isConnected } = CheckInternetSlice.actions

export default CheckInternetSlice.reducer
