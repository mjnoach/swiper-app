import { H1, H2 } from '@expo/html-elements'
import { animated, to as interpolate } from '@react-spring/web'
import React from 'react'
import { StyleSheet } from 'react-native'
import { api } from '../../api'
import { User } from '../../types'
import { getProfileImageUrl } from '../../utils'
import { getCurrentUser } from '../SessionContext'
import { View } from '../Themed'
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

  // TODO Deck list pagination

  return (
    <>
      {springs.map((spring, i) => (
        <Card
          key={i}
          spring={spring}
          {...{ bindDrag, i, profile: props.items[i] }}
        />
      ))}
    </>
  )
}

type CardProps = {
  profile: User
  i?: any
  spring?: {
    x: any
    y: any
    rot: any
    scale: any
  }
  bindDrag?: any
}

export function Card({ profile, i, spring, bindDrag }: CardProps) {
  const { x, y, rot, scale } = spring ?? {}
  const bindObj = bindDrag ? bindDrag(i) : {}

  return (
    <animated.div key={i} style={{ ...styles.deck, ...{ x, y } }}>
      <animated.div
        {...bindObj}
        style={{
          ...styles.card,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          transform: interpolate([rot, scale], trans),
          backgroundImage: `url(${getProfileImageUrl(profile.id)})`,
        }}
      >
        <View style={styles.details}>
          <H1 selectable={false}>{profile.name}</H1>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <H2 selectable={false}>{profile.age}</H2>
            <H2 selectable={false}>id: {profile.id}</H2>
          </View>
        </View>
      </animated.div>
    </animated.div>
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
