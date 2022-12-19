import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { View } from './components/Themed'

import { MantineProvider } from '@mantine/core'
import { SessionProvider } from './components/SessionContext'
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
    <SessionProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <View style={[styles.app]}>
          <View style={styles.centered}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </View>
        </View>
      </MantineProvider>
    </SessionProvider>
  )
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  centered: {
    marginHorizontal: 'auto',
    flex: 1,
    height: '100%',
    width: '100%',
  },
})
