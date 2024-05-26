import { StatusBar } from 'expo-status-bar'
import { View } from './components/Themed'

import { MantineProvider } from '@mantine/core'
import EStyleSheet from 'react-native-extended-stylesheet'
import { SessionProvider } from './components/SessionContext'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'

// TODO
// – fix hot reloading
// – give some indication when there are no more cards in the stack to swipe
//   only unmatched profiles reappear after the stack has been swiped out completely
//   BUG: cards disappear from the stack after navigating back and forth between Feed and User tabs
// – set login screen as default if session doesn't exist

EStyleSheet.build({})

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

const styles = EStyleSheet.create({
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
