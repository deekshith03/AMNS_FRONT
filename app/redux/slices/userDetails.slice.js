import { createSlice } from '@reduxjs/toolkit'

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    userDetails: undefined
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload
      // console.log('statttt---', action.payload)
    }
  }
})

export const { setUserDetails } = userDetailsSlice.actions
export default userDetailsSlice.reducer
