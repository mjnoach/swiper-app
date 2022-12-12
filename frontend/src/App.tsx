import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { View } from './components/Themed'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  }
  return (
    <SafeAreaProvider style={styles.app}>
      <View style={[styles.centered]}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: 'darkslategrey',
  },
  centered: {
    flex: 1,
    maxWidth: '80%',
    maxHeight: '60%',
  },
})
