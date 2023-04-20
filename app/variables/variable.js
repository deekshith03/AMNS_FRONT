import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { showMessage } from 'react-native-flash-message';
import * as RootNavigation from '../navigator/RootNavigation.navigator';
export const Base_uri = 'http://10.0.2.2:8080/'
// export const Base_uri = 'https://e930-203-193-157-130.ngrok-free.app/'
// export const Base_uri = 'https://ef13-2401-4900-338b-7d7-4c0f-2eb2-4e29-6670.ngrok-free.app'

export const axiosInstance = axios.create({
  baseURL: Base_uri
})

const errorComposer = (error) => {
  return () => {
    const statusCode = error.response ? error.response.status : null
    if (statusCode === 401) {
      showMessage({ message: '401 errors', type: 'danger', position: 'bottom' })
    } else if (statusCode === 404) {
      showMessage({ message: '404 errors', type: 'danger', position: 'bottom' })
    } else {
      RootNavigation.navigate('serverDownScreen')
    }
  }
}

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${await SecureStore.getItemAsync('AccessToken')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config

    if (
      error.response?.status === 403 &&
      !originalRequest._retry &&
      error.response?.data.errors[0].message === 'Token expired'
    ) {
      originalRequest._retry = true
      const res = await axios.post(Base_uri + 'api/refreshToken', {
        refreshToken: await SecureStore.getItemAsync('RefreshToken')
      })
      const data = res?.data
      const access_token = res.AccessToken
      await SecureStore.setItemAsync('AccessToken', data.AccessToken)
      await SecureStore.setItemAsync('RefreshToken', data.RefreshToken)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
      return axiosInstance(originalRequest)
    } else {
      error.handleGlobally = errorComposer(error)
      return Promise.reject(error)
    }
  }
)
export const collegeStartYear = 1984
