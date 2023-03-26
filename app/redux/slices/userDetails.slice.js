import { createSlice } from '@reduxjs/toolkit'

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    userDetails: {}
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload
      console.log('statttt---', state.userDetails)
    }
  }
})

export const { setUserDetails } = userDetailsSlice.actions
export default userDetailsSlice.reducer
