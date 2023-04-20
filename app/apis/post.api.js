import { showMessage } from 'react-native-flash-message';
import { axiosInstance } from '../variables/variable';

export const getPost = async (success_func) => {
  return await axiosInstance.get('/api/posts').then((res) => {
    success_func(res)
  })
}

export const addPost = async (data) => {
  return await axiosInstance.post('/api/posts/', data).then((res) => {
    showMessage({
      message: res.data.message,
      type: 'success',
      position: 'bottom'
    })
  })
}

export const removeFile = async (fileName, success_func) => {
  return await axiosInstance.delete(`api/removeFile/${fileName}`).then(() => {
    success_func()
    showMessage({
      message: 'File removed',
      type: 'info',
      position: 'bottom'
    })
  })
}

export const uploadFile = async (data, config, success_func) => {
  axiosInstance.defaults.headers.put['Content-Type'] = 'multipart/form-data'
  axiosInstance.defaults.headers.put['mimeType'] = 'multipart/form-data'

  return await axiosInstance
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
  return await axiosInstance
    .post('api/posts/tags', data)
    .then((res) => {
      success_func(res)
    })
}

export const getComments = async (data, success_func) => {
  return await axiosInstance.get(`/api/posts/${data}/comments`).then((res) => {
    success_func(res)
  })
}

export const addComments = async (data, id) => {
  return await axiosInstance.post(`/api/posts/${id}/comments`, data).then((res) => {
    showMessage({
      message: res.data.message,
      type: 'success',
      position: 'bottom'
    })
  })
}

export const likePost = async (id, success_func) => {
  return await axiosInstance.post(`/api/posts/${id}/like`).then((res) => {
    if (res.status == 206) {
      showMessage({
        message: res.data?.errors[0].message,
        type: 'warning',
        position: 'bottom'
      })
      return
    }
    success_func()
  })
}
