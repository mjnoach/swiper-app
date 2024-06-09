export type User = {
  id: number
  email: string
  password: string
  name: string
  gender: string
  age: number
}

export type AuthResponse = {
  jwt: string
  user: User
}

export type Swipe = {
  user: number
  profile: number
  preference: "yes" | "no"
}
