import { animated, to as interpolate } from '@react-spring/web'
import React, { useContext } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { api } from '../../lib/api'
import { User } from '../../types'
import { Card } from '../Card'
import { SessionContext } from '../SessionContext'
import { trans, useDrag } from './useDrag'

type DeckProps = {
  items: User[]
}

export function Deck(props: DeckProps) {
  const { user } = useContext(SessionContext)

  const { springs, bindDrag } = useDrag({
    deckItems: props.items,
    swipeLeft,
    swipeRight,
  })

  async function swipeLeft(item: { id: number }) {
    api.swipe({
      user: user!.id,
      profile: item.id,
      preference: 'no',
    })
  }

  async function swipeRight(item: { id: number }) {
    const response = await api.swipe({
      user: user!.id,
      profile: item.id,
      preference: 'yes',
    })
    const hasMatch = response.data
    if (hasMatch) {
      alert("It's a match!")
    }
  }

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

const styles = EStyleSheet.create({
  deck: {
    position: 'absolute',
    top: 0,
  },
})
