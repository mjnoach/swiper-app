import { ProfileCard } from "@/components/ProfileCard"
import { api } from "@/lib/api"
import { randomInt } from "@/lib/utils"
import { SessionContext } from "@/providers/session"
import { User } from "@/types"
import React, { useContext } from "react"
import { StyleSheet, View } from "react-native"
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

  async function swipeLeft(item: { id: number }) {
    api.swipe({
      user: user!.id,
      profile: item.id,
      preference: "no",
    })
  }

  async function swipeRight(item: { id: number }) {
    const response = await api.swipe({
      user: user!.id,
      profile: item.id,
      preference: "yes",
    })
    const hasMatch = response.data
    if (hasMatch) {
      alert("It's a match!")
    }
  }

  const pressed = useSharedValue<boolean>(false)

  const offsetX = useSharedValue<number>(0)
  const offsetY = useSharedValue<number>(0)

  const SWIPE_BOUNDARY = 250
  const EXIT_POSITION = 700

  const pan = Gesture.Pan()
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

      if (offsetX.value < -SWIPE_BOUNDARY)
        return (offsetX.value = withSpring(-EXIT_POSITION))

      if (offsetX.value > SWIPE_BOUNDARY)
        return (offsetX.value = withSpring(EXIT_POSITION))

      offsetX.value = withSpring(0)
    })

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
      { scale: withTiming(pressed.value ? 1.2 : 1) },
    ],
    // @ts-ignore
    cursor: "grab",
  }))

  const rotation = () => `${randomInt(0, 1) ? "-" : ""}${randomInt(0, 6)}deg`

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        {props.profiles.map((profile, i) => (
          <View
            key={i}
            style={{
              ...styles.card,
              transform: [
                {
                  rotate: rotation(),
                },
              ],
            }}
          >
            {i === props.profiles.length - 1 ? (
              <GestureDetector gesture={pan}>
                <Animated.View style={animatedStyles}>
                  <ProfileCard profile={props.profiles[0]} />
                </Animated.View>
              </GestureDetector>
            ) : (
              <ProfileCard profile={profile} />
            )}
          </View>
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
