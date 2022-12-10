import { Dimensions, StyleSheet } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { Text, View } from './Themed'

type CardProps = {
  index: number
  title: string
}

export default function Card({ index, title }: CardProps) {
  return (
    <Shadow
      stretch
      distance={50}
      startColor={'#00000010'}
      containerStyle={styles.shadowContainer}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text>id: {index}</Text>
      </View>
    </Shadow>
  )
}

const CARD_WIDTH = Dimensions.get('window').width * 0.8
const CARD_HEIGHT = Dimensions.get('window').height * 0.76

const styles = StyleSheet.create({
  shadowContainer: {
    margin: 15,
  },
  card: {
    height: CARD_HEIGHT,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
  },
})
