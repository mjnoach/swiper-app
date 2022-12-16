import { createContext, useContext, useEffect, useState } from 'react'
import storage from '../storage'
import { User } from '../types'

type SessionContext = {
  user: User | null
  getCurrentUser: () => Promise<User | null>
  setSession(user: User, jwt: string): Promise<void>
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

  async function setSession(user: User, jwt: string) {
    setUser(user)
    storage.set('user', user)
    storage.set('jwt', jwt)
  }

  async function clearSession() {
    setUser(null)
    storage.remove('user')
    storage.remove('jwt')
  }

  return (
    <SessionContext.Provider
      value={{ user, getCurrentUser, setSession, clearSession }}
    >
      {props.children}
    </SessionContext.Provider>
  )
}
