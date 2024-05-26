import { H1 } from '@expo/html-elements'
import { Button } from '@mantine/core'
import { StatusBar } from 'expo-status-bar'
import { Platform, ScrollView } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Card } from '../components/Card'
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
    <ScrollView contentContainerStyle={styles.container}>
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
          <Button
            style={styles.button}
            color="dark"
            onClick={handleSignOutClick}
          >
            Sign Out
          </Button>
        </>
      )}
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ScrollView>
  )
}

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '1rem',
  },
  cardWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2rem',
  },
  button: {
    marginTop: '2rem',
    marginBottom: '2rem',
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
