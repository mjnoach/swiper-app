import { H1, H2 } from '@expo/html-elements'
import { animated, to as interpolate } from '@react-spring/web'
import React from 'react'
import { StyleSheet } from 'react-native'
import { User } from '../../models.types'
import { getProfileImageUrl } from '../../utils'
import { View } from '../Themed'
import { trans, useDrag } from './useDrag'

type DeckProps = {
  profiles: User[]
}

export function Deck(props: DeckProps) {
  const { springs, bind } = useDrag(props)

  return (
    <>
      {springs.map(({ x, y, rot, scale }, i) => (
        <animated.div key={i} style={{ ...styles.deck, ...{ x, y } }}>
          <animated.div
            {...bind(i)}
            style={{
              ...styles.card,
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${getProfileImageUrl(
                props.profiles[i].id,
              )})`,
            }}
          >
            <View style={styles.details}>
              <H1 selectable={false}>{props.profiles[i].name}</H1>
              <H2 selectable={false}>{props.profiles[i].age}</H2>
              <H2 selectable={false}>id: {props.profiles[i].id}</H2>
            </View>
          </animated.div>
        </animated.div>
      ))}
    </>
  )
}

const styles = StyleSheet.create({
  deck: {
    position: 'absolute',
  },
  card: {
    width: '26rem',
    height: '42rem',
    borderRadius: 20,
    backgroundColor: 'white',
    backgroundSize: '100% 92%',
    backgroundRepeat: 'no-repeat',
    boxShadow:
      '0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)',
    touchAction: 'none',
  },
  details: {
    borderRadius: 20,
    backgroundColor: 'rgba(218, 218, 218, 0)',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingHorizontal: '2rem',
  },
})
