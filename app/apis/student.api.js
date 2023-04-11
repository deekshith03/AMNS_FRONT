import { showMessage } from "react-native-flash-message"
import { axiosInstance } from "../variables/variable"

export const addStudent = async (data) => {
  return await axiosInstance.post('api/student', data).then((response) => {
    showMessage({
      message: response.data.message,
      type: 'success',
      position: 'bottom'
    })
  })
}