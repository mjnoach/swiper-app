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
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Item 1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Item 2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Item 3',
  },
  {
    id: 'bd7acbea-c1b1-4652-aed5-3ad53a2b281a',
    title: 'Item 4',
  },
  {
    id: '3ac68afc-c605-48a2-a5f8-fbd91aa97f63',
    title: 'Item 5',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e51d72',
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
    backgroundColor: 'red',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
})
