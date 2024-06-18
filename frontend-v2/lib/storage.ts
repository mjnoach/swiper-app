import AsyncStorage from "@react-native-async-storage/async-storage"

export const storage = {
  set: (key: string, value: string) => AsyncStorage.setItem(key, value),
  get: (key: string) => AsyncStorage.getItem(key),
  remove: (key: string) => AsyncStorage.removeItem(key),
}
