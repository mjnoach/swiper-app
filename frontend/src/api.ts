import axios from 'axios'
import { API_URL } from './config'
import storage from './storage'
// import Constants from 'expo-constants'

const api = axios.create({
  // baseURL: Constants.expoConfig.extra.API_URL,
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  async (config) => {
    const jwt = await storage.get('jwt')
    if (jwt) config.headers['Authorization'] = `Bearer ${jwt}`
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

export { api }
