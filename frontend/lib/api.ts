import { storage } from "@/lib/storage"
import { Swipe, User } from "@/types"
import axios from "axios"

type AuthResponse = {
  jwt: string
  user: User
}

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
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

export const api = {
  fetchProfiles: (user: User) =>
    apiClient.get<User[]>(`/profiles?id=${user?.id}`).catch(handeError),

  login: (email: string, password: string) =>
    apiClient
      .post<AuthResponse>(`/auth/login`, {
        email,
        password,
      })
      .catch(handeError),

  register: (email: string, password: string) =>
    apiClient
      .post<AuthResponse>(`/auth/register`, {
        email,
        password,
      })
      .catch(handeError),

  swipe: (swipe: Swipe) =>
    apiClient.post<User[]>(`/swipe`, swipe).catch(handeError),
}

function handeError(err: any) {
  console.log("Api Error:", err)
  if (typeof err.response?.data === "string") throw new Error(err.response.data)
  if (!!err.response?.message) throw new Error(err.response.message)
  if (err.code === "ECONNABORTED")
    throw new Error(`Timeout Error\n\n${process.env.EXPO_PUBLIC_API_URL}`)
  if (err.code === "ERR_NETWORK") throw new Error("Network Error")
  if (err.code === "ERR_BAD_REQUEST") throw new Error("Bad Request")
  if (err.code === "ERR_BAD_RESPONSE") throw new Error("Server Error")
}
