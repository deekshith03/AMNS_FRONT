import { createSlice } from '@reduxjs/toolkit'

const totalAdvisorsSlice = createSlice({
  name: 'totalAdvisors',
  initialState: {
    totalAdvisors: []
  },
  reducers: {
    setTotalAdvisors: (state, action) => {
      state.totalAdvisors = action.payload
    }
  }
})

export const { setTotalAdvisors } = totalAdvisorsSlice.actions
export default totalAdvisorsSlice.reducer
