import { showMessage } from 'react-native-flash-message'
import { axiosInstance } from '../variables/variable'

export const generateJSON = async (data, headerNumber, success_func) => {
  axiosInstance.defaults.headers.put['Content-Type'] = 'multipart/form-data'
  axiosInstance.defaults.headers.put['mimeType'] = 'multipart/form-data'

  await axiosInstance
    .post(`api/import/generate-json/${headerNumber}`, data)
    .then((res) => {
      success_func(res)
    })
}

export const saveExcelData = async (data, success_func) => {
  // console.log('from save excel api', data)
  await axiosInstance.post('api/import/save', data).then((res) => {
    success_func(res)
    showMessage({
      message: res.data.success ? 'Saved Successfully' : 'Failed to save',
      type: res.data.success ? 'success' : 'danger',
      position: 'bottom'
    })
  })
}
