import React from 'react'
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import Card from '../components/Card'
import { Profile } from './models.types'

const NUM_OF_CARDS = 2
const profiles: Profile[] = Array.from({ length: NUM_OF_CARDS }).map(
  (_, i) => ({
    id: i,
    title: `Item ${i}`,
  }),
)

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

export default function FeedScreen() {
  const [refreshing, setRefreshing] = React.useState(false)

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(1500).then(() => setRefreshing(false))
  }, [])

  // return (
  //   <View style={styles.container}>
  //     <Deck profiles={profiles} />
  //   </View>
  // )

  const Cards = () => (
    <>
      {profiles.map((p) => (
        <Card key={p.id} {...p} />
      ))}
    </>
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        pagingEnabled
        data={profiles}
        renderItem={Cards}
        keyExtractor={(item, i) => profiles[i].id.toString()}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    // cursor:
    //   "url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png') 39 39,\n    auto",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})
