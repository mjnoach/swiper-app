import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../models.types'
import storage from '../storage'

type SessionContext = {
  user: User | null
  getCurrentUser: () => Promise<User | null>
}

export const SessionContext = createContext<SessionContext>(
  {} as SessionContext,
)

export const useSession = () => useContext(SessionContext)

async function getCurrentUser() {
  return await storage.get<User>('user')
}

export function SessionProvider(props) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser()
      setUser(user)
    }
    fetchUser()
  }, [])

  return (
    <SessionContext.Provider value={{ user, getCurrentUser }}>
      {props.children}
    </SessionContext.Provider>
  )
}
