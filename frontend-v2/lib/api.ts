import { storage } from "@/lib/storage"
import { AuthResponse, Swipe, User } from "@/types"
import axios from "axios"

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

apiClient.interceptors.request.use(
  async (config) => {
    const jwt = await storage.get("jwt")
    if (jwt) config.headers["Authorization"] = `Bearer ${jwt}`
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

const api = {
  fetchProfiles: (user: User) =>
    apiClient.get<User[]>(`/profiles?id=${user?.id}`),
  login: (email: string, password: string) =>
    apiClient.post<AuthResponse>(`/auth/login`, {
      email,
      password,
    }),
  register: (email: string, password: string) =>
    apiClient.post<AuthResponse>(`/auth/register`, {
      email,
      password,
    }),
  swipe: (swipe: Swipe) => apiClient.post<User[]>(`/swipe`, swipe),
}

export { api }
