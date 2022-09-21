import { configureStore } from '@reduxjs/toolkit'
import loadingSlice from './slices/loading.slice'
export const store = configureStore({
  reducer: {
    loader: loadingSlice
  }
})
