import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:8080/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
})
