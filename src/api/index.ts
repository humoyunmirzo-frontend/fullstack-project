import axios from 'axios'
import { useHelpersStore } from '~/stores/helpers'

const helpersStore = useHelpersStore()
const http = axios.create({
  baseURL: 'https://dummyjson.com/',
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use((config) => {
  helpersStore.showOverlay = true
  if (!window.navigator.onLine)
    helpersStore.showToast = true
  else
    helpersStore.showToast = false

  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`

  return config
}, (error) => {
  helpersStore.showOverlay = false
  return Promise.reject(error)
})

http.interceptors.response.use((response) => {
  helpersStore.showOverlay = false
  return response
}, (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('token')
    window.location.reload()
  }
  helpersStore.showOverlay = false
  return Promise.reject(error)
})

export default http
