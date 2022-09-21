import axios from 'axios'
import { showMessage } from 'react-native-flash-message'

export const axiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:8080/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
})

const errorComposer = (error) => {
  return () => {
    const statusCode = error.response ? error.response.status : null

    if (statusCode === 401) {
      showMessage({ message: '401 errors', type: 'danger', position: 'bottom' })
    } else if (statusCode === 404) {
      showMessage({ message: '404 errors', type: 'danger', position: 'bottom' })
    } else {
      showMessage({
        message: 'Something got fucked up from our side',
        type: 'danger',
        position: 'bottom'
      })
    }
  }
}

axiosInstance.interceptors.response.use(undefined, (error) => {
  error.handleGlobally = errorComposer(error)
  return Promise.reject(error)
})
