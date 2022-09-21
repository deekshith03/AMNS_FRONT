import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false
}

const LoaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    changeState: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { changeState } = LoaderSlice.actions

export default LoaderSlice.reducer
