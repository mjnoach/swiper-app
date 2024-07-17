import { Deck } from "@/components/Deck"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { api } from "@/lib/api"
import { useSession } from "@/providers/session"
import { SwipeProgress, User } from "@/types"
import React, { useEffect, useState } from "react"
import Confetti from "react-confetti-boom"
import { StyleSheet } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated"

const DECK_SIZE = 8

export default function ExploreTab() {
  const { user } = useSession()
  const [profiles, setProfiles] = useState<User[]>([])
  const [message, setMessage] = useState("")
  const bgOpacity = useSharedValue<number>(0.0)
  const swipeDirection = useSharedValue<SwipeProgress["direction"]>("")
  const [confettiKey, setConfettiKey] = useState(0)

  useEffect(() => {
    if (confettiKey !== 0) {
      const timer = setTimeout(() => {
        setConfettiKey(0)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [confettiKey])

  useEffect(() => {
    fetchProfiles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onMatch() {
    setConfettiKey((prevKey) => prevKey + 1)
  }

  async function fetchProfiles() {
    setProfiles([])
    const res = await api
      .fetchProfiles(user!)
      .catch((err: Error) => setMessage(err.message))
    if (!res) return
    if (res.data === null) return setMessage("No more content to explore")
    let profiles = res.data
    profiles = shuffle(profiles.slice(0, DECK_SIZE))
    console.log("Profiles:", profiles)
    setProfiles(profiles)
  }

  function handleSwipeProgress({ swipeProgress, direction }: SwipeProgress) {
    swipeDirection.value = direction
    bgOpacity.value = swipeProgress - 0.5
  }

  const animatedBackground = useAnimatedStyle(() => ({
    backgroundColor: {
      right: `rgba(0, 255, 0, ${bgOpacity.value})`,
      left: `rgba(255, 0, 0, ${bgOpacity.value})`,
      "": "transparent",
    }[swipeDirection.value],
    height: "100%",
    width: "100%",
  }))

  return (
    <ThemedView style={styles.container}>
      {!!message && <ThemedText type="subtitle">{message}</ThemedText>}
      {!!profiles.length && (
        <Animated.View style={[animatedBackground]}>
          <Deck
            profiles={profiles}
            onDeckEnd={fetchProfiles}
            handleSwipeProgress={handleSwipeProgress}
            onMatch={onMatch}
          />
        </Animated.View>
      )}
      {confettiKey !== 0 && (
        <Confetti
          key={confettiKey}
          shapeSize={50}
          spreadDeg={50}
          y={0.8}
          launchSpeed={2}
          mode="boom"
          particleCount={100}
        />
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

function shuffle(array: any[]) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item)
}
