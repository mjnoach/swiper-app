import { H1, H2 } from '@expo/html-elements'
import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useState } from 'react'
import { Image, Pressable, StyleSheet, Text } from 'react-native'
import { getProfileImageUrl } from '../utils'
import { View } from './Themed'

function PullRelease(props) {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
  })

  return (
    <animated.div {...bind()} style={{ x, y, touchAction: 'none' }}>
      {props.children}
    </animated.div>
  )
}

type ButtonProps = {
  title: string
  onPress?: () => void
}

function Button(props: ButtonProps) {
  const [hover, setHover] = useState(false)
  const { x } = useSpring({
    from: { x: 0 },
    x: hover ? 1 : 0,
    config: { duration: 70 },
  })

  function handleHoverIn() {
    setHover(true)
  }

  function handleHoverOut() {
    setHover(false)
  }

  const animatedProps = {
    transform: x
      .to({
        range: [0, 1],
        output: [1, 1.1],
      })
      .to((x) => `scale(${x})`),
  }

  return (
    <animated.div style={animatedProps}>
      <Pressable
        style={[styles.button, styles.shadow]}
        onPress={props.onPress}
        onHoverIn={handleHoverIn}
        onHoverOut={handleHoverOut}
      >
        <Text style={styles.buttonText} selectable={false}>
          {props.title}
        </Text>
      </Pressable>
    </animated.div>
  )
}

function ActionBar(props) {
  function handleThumbsDownPress() {
    console.log('thumbs down')
    return null
  }

  function handleThumbsUpPress() {
    console.log('thumbs up')
    return null
  }

  return (
    <View style={styles.actionBar}>
      <Button title="👎" onPress={handleThumbsDownPress} />
      <Button title="👍" onPress={handleThumbsUpPress} />
    </View>
  )
}

type CardProps = {
  id: number
  title: string
}
type Card = CardProps

export default function Card({ id, title }: CardProps) {
  return (
    <PullRelease>
      <View style={[styles.card, styles.shadow]}>
        <View style={[styles.content]}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{ uri: getProfileImageUrl(id) }}
          />
          <View style={styles.details}>
            <View style={styles.text}>
              <H1 selectable={false}>{title}</H1>
              <H2 selectable={false}>id: {id}</H2>
            </View>
            <ActionBar />
          </View>
        </View>
      </View>
    </PullRelease>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    borderRadius: 20,
    position: 'relative',
  },
  image: {
    flex: 1,
    marginBottom: '13rem',
    borderRadius: 20,
  },
  details: {
    borderRadius: 20,
    backgroundColor: 'rgba(218, 218, 218, 0)',
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  text: {
    paddingHorizontal: '2rem',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: 'rgba(218, 218, 218, 0.5)',
  },
  button: {
    width: '10rem',
    height: '10rem',
    borderRadius: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 72,
  },
  actionBar: {
    backgroundColor: 'rgba(218, 218, 218, 0.5)',
    paddingTop: '1rem',
    paddingBottom: '2rem',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '6rem',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  card: {
    marginHorizontal: '2rem',
    margin: '1rem',
    height: '48rem',
    flex: 1,
    borderRadius: 20,
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
  },
})
