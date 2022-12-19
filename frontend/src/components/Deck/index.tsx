import { animated, to as interpolate } from '@react-spring/web'
import React from 'react'
import { StyleSheet } from 'react-native'
import { api } from '../../api'
import { User } from '../../types'
import { Card } from '../Card'
import { getCurrentUser } from '../SessionContext'
import { trans, useDrag } from './useDrag'

type DeckProps = {
  items: User[]
}

export function Deck(props: DeckProps) {
  const { springs, bindDrag } = useDrag({
    deckItems: props.items,
    swipeLeft,
    swipeRight,
  })

  return (
    <>
      {springs.map((spring, i) => (
        <animated.div
          key={i}
          style={{ ...styles.deck, ...{ x: spring.x, y: spring.y } }}
        >
          <animated.div
            {...bindDrag(i)}
            style={{
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              transform: interpolate([spring.rot, spring.scale], trans),
            }}
          >
            <Card profile={props.items[i]} />
          </animated.div>
        </animated.div>
      ))}
    </>
  )
}

async function swipeLeft(item: { id: number }) {
  const user = await getCurrentUser()
  const swipe = {
    user: user?.id,
    profile: item.id,
    preference: 'no',
  }
  console.log('🚀 ~ file: index.tsx ~ line 89 ~ swipeLeft ~ swipe', swipe)
  try {
    await api.post<User[]>(`/swipe`, swipe)
  } catch (error) {
    console.log('🚀 ~ file: useDrag.tsx ~ line 24 ~ swipeLeft ~ error', error)
  }
}

async function swipeRight(item: { id: number }) {
  const user = await getCurrentUser()
  const swipe = {
    user: user?.id,
    profile: item.id,
    preference: 'yes',
  }
  console.log('🚀 ~ file: index.tsx ~ line 104 ~ swipeRight ~ swipe', swipe)
  try {
    const response = await api.post<User[]>(`/swipe`, swipe)
    const hasMatch = response.data
    console.log(
      '🚀 ~ file: index.tsx ~ line 109 ~ swipeRight ~ hasMatch',
      hasMatch,
    )
    if (hasMatch) {
      alert('You have a match!')
    }
  } catch (error) {
    console.log('🚀 ~ file: useDrag.tsx ~ line 24 ~ swipeLeft ~ error', error)
  }
}

const styles = StyleSheet.create({
  deck: {
    position: 'absolute',
    top: 0,
  },
})
