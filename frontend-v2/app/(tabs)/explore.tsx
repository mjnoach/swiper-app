import { Deck } from "@/components/Deck"
import { api } from "@/lib/api"
import { SessionContext } from "@/providers/session"
import { User } from "@/types"
import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"

export default function ExploreTab() {
  const [profiles, setProfiles] = useState<User[] | null>(null)
  const { user } = useContext(SessionContext)

  useEffect(() => {
    if (!user) return
    api.fetchProfiles(user).then((res) => {
      const { data: profiles } = res
      if (profiles === null) {
        // TODO
        // ran out of profiles
        return
      }
      setProfiles(profiles)
    })
  }, [user])

  return (
    <View style={styles.container}>
      {profiles && <Deck profiles={profiles} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
