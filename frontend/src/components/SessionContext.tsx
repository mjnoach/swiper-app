import { createContext, useEffect, useState } from 'react'
import storage from '../lib/storage'
import { User } from '../types'

type SessionContext = {
  user: User | null
  setSession(user: User, jwt: string): Promise<void>
  clearSession(): Promise<void>
}

export const SessionContext = createContext<SessionContext>({
  user: null,
  setSession: async () => {},
  clearSession: async () => {},
})

export function SessionProvider(props) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    storage.get('user').then((user) => {
      if (user) setUser(JSON.parse(user) as User)
    })
  }, [])

  async function setSession(user: User, jwt: string) {
    setUser(user)
    storage.set('user', JSON.stringify(user))
    storage.set('jwt', jwt)
  }

  async function clearSession() {
    setUser(null)
    storage.remove('user')
    storage.remove('jwt')
  }

  return (
    <SessionContext.Provider value={{ user, setSession, clearSession }}>
      {props.children}
    </SessionContext.Provider>
  )
}
