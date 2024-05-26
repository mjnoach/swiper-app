import React, { useEffect } from 'react'
import { View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { api } from '../api'
import { Deck } from '../components/Deck/index'
import { useSession } from '../components/SessionContext'
import { User } from '../types'

async function fetchProfiles(user: User | null) {
  if (!user) return []
  const response = await api.get<User[]>(`profiles?id=${user?.id}`)
  const profiles = response.data ?? []
  return profiles
}

export default function FeedScreen({ navigation }) {
  const [profiles, setProfiles] = React.useState<User[]>([])
  const { getCurrentUser } = useSession()

  function refreshFeed() {
    getCurrentUser()
      .then((user) => fetchProfiles(user))
      .then((profiles) => setProfiles(profiles.slice(0, 10)))
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', refreshFeed)
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    refreshFeed()
  }, [navigation])

  return (
    <View style={styles.container}>
      <Deck items={profiles} />
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    cursor:
      "url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png') 39 39,\n    auto",
    alignItems: 'center',
    justifyContent: 'center',
  },
})
