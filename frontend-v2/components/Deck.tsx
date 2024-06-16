import { ProfileCard } from "@/components/ProfileCard"
import { getRandomInt } from "@/lib/utils"
import { SessionContext } from "@/providers/session"
import { User } from "@/types"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import "react-native-gesture-handler"
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"

type DeckProps = {
  profiles: User[]
}

export function Deck(props: DeckProps) {
  const { user } = useContext(SessionContext)
  const [activeCardIndex, setActiveCardIndex] = useState(
    props.profiles.length - 1,
  )

  // TODO
  // if activeCardIndex === -1
  // fetch more profiles
  // or display relevant status message

  async function swipeLeft(profile: User) {
    console.log("🚀 ~ swipeLeft")
    // api.swipe({
    //   user: user!.id,
    //   profile: profile.id,
    //   preference: "no",
    // })
    setActiveCardIndex((prevIndex) => prevIndex - 1)
  }

  async function swipeRight(profile: User) {
    console.log("🚀 ~ swipeRight")
    // const response = await api.swipe({
    //   user: user!.id,
    //   profile: profile.id,
    //   preference: "yes",
    // })
    // const hasMatch = response.data
    // if (hasMatch) {
    //   alert("It's a match!")
    // }
    setActiveCardIndex((prevIndex) => prevIndex - 1)
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        {props.profiles.map((profile, i) => (
          <AnimatedProfileCard
            key={i}
            profile={profile}
            isActive={i === activeCardIndex}
            isSwipedOut={i > activeCardIndex}
            swipeLeft={() => swipeLeft(profile)}
            swipeRight={() => swipeRight(profile)}
          />
        ))}
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    aspectRatio: "3/4",
    height: "70%",
  },
})

type AnimatedProfileCardProps = {
  profile: User
  isActive: boolean
  isSwipedOut: boolean
  swipeLeft: () => Promise<void>
  swipeRight: () => Promise<void>
}

function AnimatedProfileCard(props: AnimatedProfileCardProps) {
  const pressed = useSharedValue<boolean>(false)
  const offsetX = useSharedValue<number>(0)
  const offsetY = useSharedValue<number>(0)

  const gesture = Gesture.Pan()
    .enabled(false)
    .onBegin(() => {
      pressed.value = true
    })
    .onChange((event) => {
      offsetX.value = event.translationX
      offsetY.value = event.translationY
    })
    .onFinalize(() => {
      pressed.value = false
      offsetY.value = withSpring(0)
      if (isNotSwiped(offsetX.value)) {
        offsetX.value = withSpring(0)
        return
      }
      if (isSwiped("left", offsetX.value)) {
        offsetX.value = withSpring(
          -EXIT_POSITION,
          { overshootClamping: true },
          props.swipeLeft,
        )
        return
      }
      if (isSwiped("right", offsetX.value)) {
        offsetX.value = withSpring(
          EXIT_POSITION,
          { overshootClamping: true },
          props.swipeRight,
        )
        return
      }
    })

  useEffect(() => {
    gesture.enabled(props.isActive)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isActive])

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
      { scale: withTiming(pressed.value ? 1.2 : 1) },
    ],
    // @ts-ignore
    cursor: props.isActive ? "grab" : "auto",
  }))

  const rotate = useMemo(() => `${getRandomInt(-6, 6)}deg`, [])

  return (
    <View
      style={[
        styles.card,
        {
          transform: [{ rotate }],
          display: props.isSwipedOut ? "none" : "flex",
        },
      ]}
    >
      <GestureDetector gesture={gesture}>
        <Animated.View style={animatedStyles}>
          <ProfileCard profile={props.profile} />
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

const SWIPE_BOUNDARY = 250
const EXIT_POSITION = Dimensions.get("window").width

function isSwiped(direction: "left" | "right", position: number) {
  if (direction === "left") return position < -SWIPE_BOUNDARY
  if (direction === "right") return position > SWIPE_BOUNDARY
}

function isNotSwiped(position: number) {
  return Math.abs(position) < SWIPE_BOUNDARY
}
