import { showMessage } from "react-native-flash-message"
import { axiosInstance } from "../variables/variable"

export const addStudent = (data) => {
  axiosInstance.post('api/student', data).then((response) => {
    showMessage({
      message: response.data.message,
      type: 'success',
      position: 'bottom'
    })
  })
}