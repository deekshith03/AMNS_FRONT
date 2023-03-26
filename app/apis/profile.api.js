import { axiosInstance } from '../variables/variable'

export const getProfile = async (data, success_func) => {
  return await axiosInstance
    .get(`/api/profile/${data.type}/${data.id}`)
    .then((res) => {
      success_func(res.data)
    })
}

export const getUserDetails = async (success_func) => {
  return await axiosInstance.get('/api/profile/user').then((res) => {
    success_func(res.data)
  })
}
