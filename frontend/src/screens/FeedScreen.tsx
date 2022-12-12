import React from 'react'
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import Card from '../components/Card'

const DATA = [
  {
    id: '1',
    title: 'Item 1',
  },
  {
    id: '2',
    title: 'Item 2',
  },
  {
    id: '3',
    title: 'Item 3',
  },
  {
    id: '4',
    title: 'Item 4',
  },
  {
    id: '5',
    title: 'Item 5',
  },
  {
    id: '6',
    title: 'Item 6',
  },
]

const renderItem = ({ item }) => <Card title={item.title} index={item.id} />

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

export default function FeedScreen() {
  const [refreshing, setRefreshing] = React.useState(false)

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(1500).then(() => setRefreshing(false))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        pagingEnabled
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
})
