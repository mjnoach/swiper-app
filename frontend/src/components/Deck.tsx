import { H1, H2 } from '@expo/html-elements'
import { animated, to as interpolate, useSprings } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Profile } from '../screens/models.types'
import { getProfileImageUrl } from '../utils'
import { View } from './Themed'

type DeckProps = {
  profiles: Profile[]
}

export default function Deck(props: DeckProps) {
  const [gone] = useState(() => new Set())
  const [springs, setSpring] = useSprings(props.profiles.length, (i) => ({
    ...to(i),
    from: from(i),
  }))
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      // If you flick hard enough it should trigger the card to fly out
      const trigger = parseInt(`${velocity}}`) > 0.2
      // Direction should either point left or right
      const dir = xDir < 0 ? -1 : 1
      // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      if (!down && trigger) gone.add(index)
      setSpring.start((i) => {
        // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
        // We're only interested in changing spring-data for the current spring
        if (index !== i) return
        const isGone = gone.has(index)
        // When a card is gone it flys out left or right, otherwise goes back to zero
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0
        // How much the card tilts, flicking it harder makes it rotate faster
        const rot =
          mx / 100 + (isGone ? dir * 10 * parseInt(`${velocity}}`) : 0)
        // Active cards lift up a bit
        const scale = down ? 1.1 : 1
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        }
      })
      if (!down && gone.size === props.profiles.length)
        setTimeout(() => {
          gone.clear()
          setSpring.start((i) => to(i))
        }, 600)
    },
  )

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
              <H1 selectable={false}>{props.profiles[i].title}</H1>
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

// These two are just helpers, they curate spring data, values that are later being interpolated into css
export const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
})

export const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })

// This is being used down there in the view, it interpolates rotation and scale into a css transform
export const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`
