import { createSlice } from '@reduxjs/toolkit'

const totalSkillsSlice = createSlice({
  name: 'totalSkills',
  initialState: {
    totalSkills: []
  },
  reducers: {
    setTotalSkills: (state, action) => {
      state.totalSkills = action.payload
    }
  }
})

export const { setTotalSkills } = totalSkillsSlice.actions
export default totalSkillsSlice.reducer
