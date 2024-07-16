import { ProfileCard } from "@/components/ProfileCard"
import { api } from "@/lib/api"
import { getRandomInt } from "@/lib/utils"
import { style } from "@/lib/utils/style"
import { useSession } from "@/providers/session"
import { Swipe, SwipeProgress, User } from "@/types"
import React, { useEffect, useMemo, useState } from "react"
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
  onDeckEnd: () => Promise<void>
  handleSwipeProgress({ swipeProgress, direction }: SwipeProgress): void
}

export function Deck(props: DeckProps) {
  const { user } = useSession()
  const [activeCardIndex, setActiveCardIndex] = useState(
    props.profiles.length - 1,
  )
  const [revertSwipe, setRevertSwipe] = useState(false)
  // const [isMatch, setMatch] = useState(false)

  // const MATCH_ANIMATION_DURATION = 2200

  // useEffect(() => {
  //   console.log("🚀 ~ Deck ~ activeCardIndex:", activeCardIndex)
  //   if (isMatch)
  //     setTimeout(() => {
  //       setMatch(false)
  //     }, MATCH_ANIMATION_DURATION)
  // }, [isMatch])

  useEffect(() => {
    if (revertSwipe) setRevertSwipe(false)
  }, [revertSwipe])

  useEffect(() => {
    if (activeCardIndex === -1) props.onDeckEnd()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCardIndex])

  async function swipeLeft(profile: User) {
    const options: Swipe = {
      swipeFrom: user!.id,
      swipedUser: profile.id,
      preference: "no",
    }
    console.log("Swipe", options)
    const res = await api.swipe(options).catch((e) => setRevertSwipe(true))
    if (!res) return
    setActiveCardIndex((prevIndex) => prevIndex - 1)
  }

  async function swipeRight(profile: User) {
    const options: Swipe = {
      swipeFrom: user!.id,
      swipedUser: profile.id,
      preference: "yes",
    }
    console.log("Swipe", options)
    const res = await api.swipe(options).catch((e) => setRevertSwipe(true))
    if (!res) return
    const hasMatch = res.data
    console.log("Match", hasMatch)
    if (hasMatch) handleMatch()
    setActiveCardIndex((prevIndex) => prevIndex - 1)
  }

  function handleMatch() {
    alert("It's a match!")
  }

  if (revertSwipe) return null

  return (
    <GestureHandlerRootView style={styles.deck}>
      {props.profiles.map((profile, i) => (
        <AnimatedCard
          key={i}
          profile={profile}
          isActive={i === activeCardIndex}
          isSwipedOut={i > activeCardIndex}
          swipeLeft={() => swipeLeft(profile)}
          swipeRight={() => swipeRight(profile)}
          handleSwipeProgress={props.handleSwipeProgress}
        />
      ))}
    </GestureHandlerRootView>
  )
}

type AnimatedCardProps = {
  profile: User
  isActive: boolean
  isSwipedOut: boolean
  swipeLeft: () => Promise<void>
  swipeRight: () => Promise<void>
  handleSwipeProgress({ swipeProgress, direction }: SwipeProgress): void
}

function AnimatedCard(props: AnimatedCardProps) {
  const pressed = useSharedValue<boolean>(false)
  const offsetX = useSharedValue<number>(0)
  const offsetY = useSharedValue<number>(0)

  offsetX.addListener(0, (offsetXValue) => {
    if (isNotSwiped(offsetXValue)) {
      props.handleSwipeProgress({
        swipeProgress: Math.min(Math.abs(offsetXValue) / SWIPE_DISTANCE, 1),
        direction: getSwipeDirection(offsetXValue),
      })
    }
    if (isSwiped("left", offsetXValue) || isSwiped("right", offsetXValue)) {
      const progress =
        (Math.abs(offsetXValue) - SWIPE_DISTANCE) /
        (EXIT_POSITION - SWIPE_DISTANCE)
      props.handleSwipeProgress({
        swipeProgress: 1 - progress,
        direction: getSwipeDirection(offsetXValue),
      })
    }
  })

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

  const animatedCard = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
      {
        scale: withTiming(
          pressed.value
            ? style.windowWidth<number>({
                small: 1.1,
                default: 1.2,
              })
            : 1,
        ),
      },
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
        <Animated.View style={[animatedCard]}>
          <ProfileCard profile={props.profile} />
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
  },
})

const SWIPE_DISTANCE = 250
const EXIT_POSITION = Dimensions.get("window").width

function isSwiped(direction: "left" | "right", position: number) {
  if (direction === "left") return position < -SWIPE_DISTANCE
  if (direction === "right") return position > SWIPE_DISTANCE
}

function isNotSwiped(position: number) {
  return Math.abs(position) < SWIPE_DISTANCE
}

const getSwipeDirection = (offsetX: number) => {
  if (offsetX < 0) return "left"
  if (offsetX > 0) return "right"
  return ""
}
