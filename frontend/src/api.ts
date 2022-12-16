import axios from 'axios'
import { APIROOT } from './config'
import storage from './storage'

const api = axios.create({
  baseURL: APIROOT,
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
