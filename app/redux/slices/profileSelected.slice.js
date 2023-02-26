import { createSlice } from '@reduxjs/toolkit'

const profileSelectedSlice = createSlice({
  name: 'profileSelected',
  initialState: {
    value: undefined
  },
  reducers: {
    setProfileSelected: (state, action) => {
      state.value = action.payload[0]
    }
  }
})

export const { setProfileSelected } = profileSelectedSlice.actions
export default profileSelectedSlice.reducer
