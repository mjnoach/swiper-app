import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Deck } from '../components/Deck/index'
import { SessionContext } from '../components/SessionContext'
import { api } from '../lib/api'
import { User } from '../types'

export default function FeedScreen() {
  const [profiles, setProfiles] = React.useState<User[] | null>(null)
  const { user } = useContext(SessionContext)

  useEffect(() => {
    if (!user) return
    api.fetchProfiles(user).then((res) => {
      const { data: profiles } = res
      if (profiles === null) {
        // ran out of profiles
        return
      }
      setProfiles(profiles)
    })
  }, [user])

  return (
    <View style={styles.container}>
      {profiles && <Deck items={profiles} />}
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
