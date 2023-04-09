import { axiosInstance } from '../variables/variable'

export const getProfile = (data, success_func) => {
  axiosInstance
    .get(`/api/profile/${data.type}/${data.id}`)
    .then((res) => {
      success_func(res.data)
    })
}

export const getUserDetails = (success_func) => {
  axiosInstance.get('/api/profile/user').then((res) => {
    success_func(res.data)
  })
}
