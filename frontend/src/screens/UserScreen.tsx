import { H1 } from '@expo/html-elements'
import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet } from 'react-native'
import { Card } from '../components/Deck/index'
import { CreateUserForm } from '../components/Form/CreateUserForm'
import { useSession } from '../components/SessionContext'

import { View } from '../components/Themed'

export default function UserScreen({ navigation }) {
  const { user } = useSession()

  return (
    <View style={styles.container}>
      {user === null ? (
        <>
          <H1>Create User</H1>
          <CreateUserForm navigation={navigation} />
        </>
      ) : (
        <Card profile={user} />
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
