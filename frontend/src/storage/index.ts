import AsyncStorage from '@react-native-async-storage/async-storage'

type Storage = {
  set: (key: string, value: string | object) => Promise<void>
  get: (key: string) => Promise<string | null>
}

export default {
  set: async (key, value) => {
    try {
      if (typeof value !== 'string') {
        value = JSON.stringify(value)
      }
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.log('🚀 ~ file: index.ts ~ line 15 ~ set: ~ e', e)
    }
  },
  get: async (key) => {
    try {
      let value = await AsyncStorage.getItem(key)
      value = value !== null ? JSON.parse(value) : null
      return value
    } catch (e) {
      console.log('🚀 ~ file: index.ts ~ line 28 ~ get: ~ e', e)
      return null
    }
  },
} as Storage
