import { createSlice } from '@reduxjs/toolkit'

const defaultExportStudentMappingsSlice = createSlice({
  name: 'defaultExportStudentMappings',
  initialState: {
    defaultExportStudentMappings: {}
  },
  reducers: {
    setDefaultExportStudentMappings: (state, action) => {
      state.defaultExportStudentMappings = action.payload
    }
  }
})

export const { setDefaultExportStudentMappings } =
  defaultExportStudentMappingsSlice.actions
export default defaultExportStudentMappingsSlice.reducer
