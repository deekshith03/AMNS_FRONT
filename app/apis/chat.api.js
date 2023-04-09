import { axiosInstance } from '../variables/variable'

export const createRoom = (data, success_fun) => {
  axiosInstance.post('/api/chats/create', data).then((res) => {
    success_fun(res.data)
  })
}

export const getRooms = (data, success_fun) => {
  axiosInstance.get(`/api/chats/index/${data}`).then((res) => {
    success_fun(res.data)
  })
}

export const showRoom = (data, success_fun) => {
  axiosInstance.get(`/api/chats/show/${data}`).then((res) => {
    success_fun(res.data)
  })
}