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
      console.log('🚀 ~ file: index.ts ~ line 15 ~ set: ~ e', e)
    }
  },
  get: async <T>(key) => {
    try {
      let value = await AsyncStorage.getItem(key)
      value = value !== null ? JSON.parse(value) : null
      return value as T
    } catch (e) {
      console.log('🚀 ~ file: index.ts ~ line 28 ~ get: ~ e', e)
      return null as T
    }
  },
  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      console.log('🚀 ~ file: index.ts ~ line 28 ~ get: ~ e', e)
    }
  },
} as Storage
