import { createSlice } from '@reduxjs/toolkit'

const totalDepartmentsSlice = createSlice({
  name: 'totalDepartments',
  initialState: {
    totalDepartments: []
  },
  reducers: {
    setTotalDepartments: (state, action) => {
      state.totalDepartments = action.payload
    }
  }
})

export const { setTotalDepartments } = totalDepartmentsSlice.actions
export default totalDepartmentsSlice.reducer
