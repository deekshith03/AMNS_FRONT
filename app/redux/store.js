import { configureStore } from '@reduxjs/toolkit'
import loadingSlice from './slices/loading.slice'
import CheckInternetSlice from './slices/Internet.slice'
export const store = configureStore({
  reducer: {
    loader: loadingSlice,
    isConnected: CheckInternetSlice
  }
})
