import { storage } from "@/lib/storage"
import { User } from "@/types"
import { createContext, useContext, useEffect, useState } from "react"

type Session = {
  user: User | null
  setSession(user: User, jwt: string): Promise<void>
  clearSession(): Promise<void>
  getUser(): Promise<User | null>
  isClient: boolean
}

export const SessionContext = createContext<Session>({
  user: null,
  setSession: async () => {},
  clearSession: async () => {},
  getUser: async () => null,
  isClient: false,
})

export function SessionProvider(props: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    getUser().then(setUser)
  }, [])

  async function getUser() {
    const user = await storage.get("user")
    if (user) return JSON.parse(user) as User
    return null
  }

  async function setSession(user: User, jwt: string) {
    setUser(user)
    storage.set("user", JSON.stringify(user))
    storage.set("jwt", jwt)
  }

  async function clearSession() {
    setUser(null)
    clearSessionData()
  }

  return (
    <SessionContext.Provider
      value={{
        user,
        setSession,
        clearSession,
        getUser,
        isClient: typeof window !== "undefined",
      }}
    >
      {props.children}
    </SessionContext.Provider>
  )
}

export function clearSessionData() {
  storage.remove("user")
  storage.remove("jwt")
}

export const useSession = () => useContext(SessionContext)
