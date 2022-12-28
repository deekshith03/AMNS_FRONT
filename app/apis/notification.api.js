import { useDispatch } from 'react-redux'
import { setNotificationList } from '../redux/slices/notificationList.slice'
import { axiosInstance } from '../variables/variable'

export const getNotification = async () => {
  const dispatch = useDispatch()
  return await axiosInstance
    .get('/api/notification/getnotification')
    .then((res) => {
      dispatch(setNotificationList(res.data))
    })
}

export const putNotification = async (id) => {
  console.log('🚀 ~ file: notification.api.js:15 ~ putNotification ~ id', id)
  return await axiosInstance.put(`/api/notification/markread/${id}`).then()
}
