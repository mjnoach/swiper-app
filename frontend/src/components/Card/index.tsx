import { H1, H2 } from '@expo/html-elements'
import { animated, useSpring } from '@react-spring/web'
import { useState } from 'react'
import { Image, Pressable, StyleSheet, Text } from 'react-native'
import { View } from '../Themed'
import { getProfileImageUrl } from './utils'

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
        style={[
          styles.button,
          styles.shadow,
          hover && {
            backgroundColor: '#eee',
          },
        ]}
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
  index: number
  title: string
}

export default function Card({ index, title }: CardProps) {
  return (
    <View style={[styles.card, styles.shadow]}>
      <PullRelease />
      <View style={[styles.content]}>
        <Image
          style={{ height: '100%', width: '100%', borderRadius: 20 }}
          source={{ uri: getProfileImageUrl('F', index) }}
        />
        <View style={styles.details}>
          <View style={styles.text}>
            <H1 selectable={false}>{title}</H1>
            <H2 selectable={false}>id: {index}</H2>
          </View>
          <ActionBar />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    borderRadius: 20,
    position: 'relative',
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
