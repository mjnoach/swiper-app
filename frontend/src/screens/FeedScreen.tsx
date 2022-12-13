import axios from 'axios'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Deck } from '../components/Deck/index'
import { APIROOT } from '../config'
import { User } from '../models.types'

export default function FeedScreen() {
  const [profiles, setProfiles] = React.useState<User[]>([])

  useEffect(() => {
    fetchProfiles()
  }, [])

  async function fetchProfiles() {
    const response = await axios.get<User[]>(`${APIROOT}/profiles`)
    const profiles = response.data
    setProfiles(profiles.slice(0, 10))
  }

  return (
    <View style={styles.container}>
      <Deck profiles={profiles} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    cursor:
      "url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png') 39 39,\n    auto",
    alignItems: 'center',
    justifyContent: 'center',
  },
})
