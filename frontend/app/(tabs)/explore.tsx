import { Deck } from "@/components/Deck"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { api } from "@/lib/api"
import { useSession } from "@/providers/session"
import { SwipeProgress, User } from "@/types"
import React, { useEffect, useState } from "react"
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

  useEffect(() => {
    fetchProfiles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      {!!profiles.length && (
        <Animated.View style={[animatedBackground]}>
          <Deck
            profiles={profiles}
            onDeckEnd={fetchProfiles}
            handleSwipeProgress={handleSwipeProgress}
          />
        </Animated.View>
      )}
      {!!message && <ThemedText type="subtitle">{message}</ThemedText>}
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
