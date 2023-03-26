import { createSlice } from '@reduxjs/toolkit'

const notificationListSlice = createSlice({
  name: 'notificationList',
  initialState: {
    notificationList: []
  },
  reducers: {
    setNotificationList: (state, action) => {
      state.notificationList = action.payload
    }
  }
})

export const { setNotificationList } = notificationListSlice.actions
export default notificationListSlice.reducer
