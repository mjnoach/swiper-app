import { ProfileCard } from "@/components/ProfileCard"
import { api } from "@/lib/api"
import { randomInt } from "@/lib/utils"
import { SessionContext } from "@/providers/session"
import { User } from "@/types"
import React, { useContext } from "react"
import { StyleSheet, View } from "react-native"

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

  return (
    <View style={styles.container}>
      {props.profiles.map((profile, i) => (
        <View
          key={i}
          style={{
            ...styles.card,
            transform: [
              { rotate: `${randomInt(0, 1) ? "-" : ""}${randomInt(0, 5)}deg` },
            ],
          }}
        >
          <ProfileCard profile={profile} />
        </View>
      ))}
    </View>
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
