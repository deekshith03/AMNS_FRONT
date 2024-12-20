import { showMessage } from "react-native-flash-message"
import { axiosInstance } from "../variables/variable"

export const sendMail = async (data) => {
  await axiosInstance
    .post('/api/sendmail', data)
    .then((res) => {
      showMessage({
        message: res.data.msg,
        type: 'success',
        position: 'bottom'
      })
    })
}

export const deleteAttachment = async (fileName, success_func) => {
  await axiosInstance
    .delete(`api/removeFile/${fileName}`)
    .then(() => {
      success_func()
      showMessage({
        message: 'file removed',
        type: 'info',
        position: 'bottom'
      })
    })
}

export const addAttachment = async (data, config, success_func) => {
  axiosInstance.defaults.headers.put['Content-Type'] = 'multipart/form-data';
  axiosInstance.defaults.headers.put['mimeType'] = 'multipart/form-data';

  await axiosInstance
    .post('api/upload/attachment', data, config)
    .then((res) => {
      success_func(res)
      showMessage({
        message: res.data.msg,
        type: 'success',
        position: 'bottom'
      })
    }
    )
}