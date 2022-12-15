import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../models.types'
import storage from '../storage'

type SessionContext = {
  user: User | null
  getCurrentUser: () => Promise<User | null>
  setSession(user: User): Promise<void>
  clearSession(): Promise<void>
}

export const SessionContext = createContext<SessionContext>(
  {} as SessionContext,
)

export const useSession = () => useContext(SessionContext)

export async function getCurrentUser() {
  return await storage.get<User>('user')
}

export function SessionProvider(props) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    getCurrentUser().then((user) => setUser(user))
  }, [])

  async function setSession(user: User) {
    setUser(user)
    storage.set('user', user)
  }

  async function clearSession() {
    setUser(null)
    storage.remove('user')
  }

  return (
    <SessionContext.Provider
      value={{ user, getCurrentUser, setSession, clearSession }}
    >
      {props.children}
    </SessionContext.Provider>
  )
}
