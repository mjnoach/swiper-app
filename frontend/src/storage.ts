import AsyncStorage from '@react-native-async-storage/async-storage'

type Storage = {
  set: (key: string, value: string | object) => Promise<void>
  get: <T>(key: string) => Promise<T | null>
  remove: (key: string) => Promise<void>
}

export default {
  set: async (key, value) => {
    try {
      AsyncStorage.removeItem(key)
      if (typeof value !== 'string') {
        value = JSON.stringify(value)
      }
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.log('🚀 ~ file: storage.ts ~ line 18 ~ set: ~ e', e)
    }
  },
  get: async <T>(key) => {
    let value = await AsyncStorage.getItem(key)
    if (value === null) return null as T
    try {
      value = JSON.parse(value)
      // value = value !== null ? JSON.parse(value) : null
      return value as T
    } catch (e) {
      console.log('🚀 ~ file: storage.ts ~ line 29 ~ get: ~ e', e)
      return value as string
    }
  },
  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      console.log('🚀 ~ file: storage.ts ~ line 35 ~ remove: ~ e', e)
    }
  },
} as Storage
