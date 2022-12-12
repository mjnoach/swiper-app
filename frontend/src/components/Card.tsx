import { StyleSheet } from 'react-native'
import { Text, View } from './Themed'

type CardProps = {
  index: number
  title: string
}

export default function Card({ index, title }: CardProps) {
  return (
    <View style={[styles.card, styles.shadowProp, styles.elevation]}>
      <Text style={styles.title}>{title}</Text>
      <Text>id: {index}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 50,
    margin: 20,
    height: '500px',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  title: {
    fontSize: 32,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#52006A',
  },
})
