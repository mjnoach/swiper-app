export type User = {
  id: number
  email: string
  password: string
  name: string
  gender: string
  age: number
}

export type Swipe = {
  swipeFrom: number
  swipedUser: number
  preference: "yes" | "no"
}
