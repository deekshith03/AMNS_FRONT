import { createSlice } from '@reduxjs/toolkit'
import { getUserDetails } from '../../apis/profile.api'
import { apiWrapper } from '../../utils/wrapper.api'

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    userDetails: {}
  },
  reducers: {
    setUserDetails: (state) => {
      console.log(state)
      if (Object.keys(state.userDetails).length === 0) {
        const success_fun = (res) => {
          state.userDetails = res.data
        }
        apiWrapper(getUserDetails, success_fun)
      }
    }
  }
})

export const { setUserDetails } = userDetailsSlice.actions
export default userDetailsSlice.reducer
