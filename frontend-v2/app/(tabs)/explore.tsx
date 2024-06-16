import { Deck } from "@/components/Deck"
import { ThemedView } from "@/components/ThemedView"
import { withSession } from "@/components/withSession"
import { api } from "@/lib/api"
import { SessionContext } from "@/providers/session"
import { User } from "@/types"
import React, { useContext, useEffect, useState } from "react"
import { StyleSheet } from "react-native"

export default withSession(function ExploreTab() {
  const [profiles, setProfiles] = useState<User[] | null>(null)
  const { user } = useContext(SessionContext)

  useEffect(() => {
    api.fetchProfiles(user!).then((res) => {
      const { data: profiles } = res
      if (profiles === null) {
        // TODO
        // show previously disliked profiles
        // or display status message:
        //  - no new profiles to show
        //  - all new profiles have been viewed
        return
      }
      setProfiles(profiles)
    })
  }, [user])

  return (
    <ThemedView style={styles.container}>
      {profiles && <Deck profiles={profiles} />}
    </ThemedView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
