import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
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
    <View style={[styles.app]}>
      <View style={styles.centered}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    paddingTop: '4rem',
  },
  centered: {
    marginHorizontal: 'auto',
    flex: 1,
    width: '40rem',
    maxWidth: '90%',
    maxHeight: '60rem',
    borderStyle: 'solid',
    borderWidth: 20,
    borderRadius: 20,
  },
})
