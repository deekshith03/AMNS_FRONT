import { createSlice } from '@reduxjs/toolkit'

const notificationListSlice = createSlice({
  name: 'notificationList',
  initialState: {
    notificationList: []
  },
  reducers: {
    setNotificationList: (state, action) => {
      console.log(
        '🚀 ~ file: notificationList.slice.js:11 ~ action.payload',
        action.payload
      )

      state.notificationList = action.payload
    }
  }
})

export const { setNotificationList } = notificationListSlice.actions
export default notificationListSlice.reducer
