import axios from 'axios'
// import { API_ROOT } from './config'
import storage from './storage'
import Constants from 'expo-constants'

const api = axios.create({
  baseURL: Constants.expoConfig.extra.API_ROOT,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  async (config) => {
    const jwt = await storage.get('jwt')
    const headers = {
      ...config.headers,
      Authorization: `Bearer ${jwt}`,
    }
    if (jwt) config.headers = headers
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

export { api }
