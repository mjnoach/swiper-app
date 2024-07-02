import { Deck } from "@/components/Deck"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { api } from "@/lib/api"
import { useSession } from "@/providers/session"
import { User } from "@/types"
import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"

const DECK_SIZE = 8

export default function ExploreTab() {
  const { user } = useSession()
  const [profiles, setProfiles] = useState<User[]>([])
  const [message, setMessage] = useState("")

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

  return (
    <ThemedView style={styles.container}>
      {!!profiles.length && (
        <Deck profiles={profiles} onDeckEnd={fetchProfiles} />
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
