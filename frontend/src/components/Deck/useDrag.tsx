import { useDrag as useDragGesture } from '@use-gesture/react'
import { useState } from 'react'
import { useSprings } from 'react-spring'
import { User } from '../../models.types'

export function useDrag(props: { profiles: User[] }) {
  const [gone] = useState(() => new Set())
  const [springs, setSpring] = useSprings(props.profiles.length, (i) => ({
    ...to(i),
    from: from(i),
  }))

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDragGesture(
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

  return { springs, bind }
}

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })

// This is being used down there in the view, it interpolates rotation and scale into a css transform
export const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`
