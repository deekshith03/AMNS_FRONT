import { createSlice } from '@reduxjs/toolkit'

const totalExportStudentMappingsSlice = createSlice({
  name: 'totalExportStudentMappings',
  initialState: {
    totalExportStudentMappings: {}
  },
  reducers: {
    setTotalExportStudentMappings: (state, action) => {
      state.totalExportStudentMappings = action.payload
    }
  }
})

export const { setTotalExportStudentMappings } =
  totalExportStudentMappingsSlice.actions
export default totalExportStudentMappingsSlice.reducer
