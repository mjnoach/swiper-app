import { H1 } from '@expo/html-elements'
import { Button } from '@mantine/core'
import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet } from 'react-native'
import { Card } from '../components/Deck/index'
import { CreateUserForm } from '../components/Form/CreateUserForm'
import { LoginForm } from '../components/Form/LoginForm'
import { useSession } from '../components/SessionContext'

import { View } from '../components/Themed'

export default function UserScreen() {
  const { user, clearSession } = useSession()

  function handleSignOutClick() {
    clearSession()
  }

  return (
    <View style={styles.container}>
      {!user ? (
        <>
          <H1>Create User</H1>
          <CreateUserForm />
          <H1>Log In</H1>
          <LoginForm />
        </>
      ) : (
        <>
          <View style={styles.cardWrapper}>
            <Card profile={user} />
          </View>
          <View style={styles.button}>
            <Button color="dark" onClick={handleSignOutClick}>
              Sign Out
            </Button>
          </View>
        </>
      )}
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2rem',
  },
  button: {
    marginVertical: '2rem',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
