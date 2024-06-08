import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Deck } from '../components/Deck/index'
import { SessionContext } from '../components/SessionContext'
import { api } from '../lib/api'
import { User } from '../types'

const STACK_SIZE = 10

export default function FeedScreen() {
  const [profiles, setProfiles] = React.useState<User[]>([])
  const { user } = useContext(SessionContext)

  useEffect(() => {
    if (!user) return setProfiles([])
    api.fetchProfiles(user).then(({ data: profiles }) => {
      setProfiles(profiles.slice(0, STACK_SIZE))
    })
  }, [user])

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
