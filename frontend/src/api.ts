import axios from 'axios'
import storage from './storage'

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
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
