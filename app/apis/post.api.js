import { showMessage } from 'react-native-flash-message'
import { useDispatch } from 'react-redux'
import { setPost } from '../redux/slices/post.slice'
import { axiosInstance } from '../variables/variable'

export const getPost = async () => {
  const dispatch = useDispatch()
  return await axiosInstance.get('/api/posts').then((res) => {
    dispatch(setPost(res.data))
  })
}

export const addPost = async (data) => {
  await axiosInstance.post('/api/posts/', data).then((res) => {
    showMessage({
      message: res.data.msg,
      type: 'success',
      position: 'bottom'
    })
  })
}

export const removeFile = async (fileName, success_func) => {
  await axiosInstance.delete(`api/removeFile/${fileName}`).then(() => {
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

  await axiosInstance
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
