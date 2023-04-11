import { axiosInstance } from '../variables/variable'

export const createRoom = async (data, success_fun) => {
  return await axiosInstance.post('/api/chats/create', data).then((res) => {
    success_fun(res.data)
  })
}

export const getRooms = async (data, success_fun) => {
  return await axiosInstance.get(`/api/chats/index/${data}`).then((res) => {
    success_fun(res.data)
  })
}

export const showRoom = async (data, success_fun) => {
  return await axiosInstance.get(`/api/chats/show/${data}`).then((res) => {
    success_fun(res.data)
  })
}