import { createContext } from 'react'
import { User } from '../models.types'
import storage from '../storage'

export const SessionContext = createContext({})

export const useSession = () => ({
  getCurrentUser: async () => {
    return await storage.get<User>('user')
  },
})

export function SessionProvider(props) {
  const { getCurrentUser } = useSession()

  return (
    <SessionContext.Provider value={{ user: getCurrentUser() }}>
      {props.children}
    </SessionContext.Provider>
  )
}
