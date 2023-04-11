import { showMessage } from 'react-native-flash-message'
import { axiosInstance } from '../variables/variable'

export const getPost = (success_func) => {
  axiosInstance.get('/api/posts').then((res) => {
    success_func(res)
  })
}

export const addPost = (data) => {
  axiosInstance.post('/api/posts/', data).then((res) => {
    showMessage({
      message: res.data.message,
      type: 'success',
      position: 'bottom'
    })
  })
}

export const removeFile = (fileName, success_func) => {
  axiosInstance.delete(`api/removeFile/${fileName}`).then(() => {
    success_func()
    showMessage({
      message: 'File removed',
      type: 'info',
      position: 'bottom'
    })
  })
}

export const uploadFile = (data, config, success_func) => {
  axiosInstance.defaults.headers.put['Content-Type'] = 'multipart/form-data'
  axiosInstance.defaults.headers.put['mimeType'] = 'multipart/form-data'

  axiosInstance
    .post('api/upload/attachment', data, config)
    .then((res) => {
      success_func(res)
      showMessage({
        message: res.data.msg,
        type: 'success',
        position: 'bottom'
      })
    })
}

export const getTags = async (data, success_func) => {
  axiosInstance
    .post('api/posts/tags', data)
    .then((res) => {
      success_func(res)
    })
}

export const getComments = (data, success_func) => {
  axiosInstance.get(`/api/posts/${data}/comments`).then((res) => {
    success_func(res)
  })
}

export const addComments = (data, id) => {
  axiosInstance.post(`/api/posts/${id}/comments`, data).then((res) => {
    showMessage({
      message: res.data.message,
      type: 'success',
      position: 'bottom'
    })
  })
}
