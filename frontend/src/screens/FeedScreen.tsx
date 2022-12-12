import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Deck } from '../components/Deck'
import { Profile } from './models.types'

const NUM_OF_CARDS = 5
const profiles: Profile[] = Array.from({ length: NUM_OF_CARDS }).map(
  (_, i) => ({
    id: i,
    title: `Item ${i}`,
  }),
)

export default function FeedScreen() {
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
