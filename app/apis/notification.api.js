import { useDispatch } from 'react-redux'
import { setNotificationList } from '../redux/slices/notificationList.slice'
import { axiosInstance } from '../variables/variable'

export const getNotification = () => {
  const dispatch = useDispatch()
  axiosInstance
    .get('/api/notification/getnotification')
    .then((res) => {
      dispatch(setNotificationList(res.data))
    })
}

export const putNotification = (id) => {
  axiosInstance.put(`/api/notification/markread/${id}`).then()
}
