import { Button } from "@/components/Button"
import { ProfileCard } from "@/components/ProfileCard"
import { ThemedView } from "@/components/ThemedView"
import { SessionContext } from "@/providers/session"
import { useContext } from "react"
import { StyleSheet } from "react-native"

export default function UserTab() {
  const { user, clearSession } = useContext(SessionContext)

  return (
    <ThemedView style={styles.container}>
      <ProfileCard profile={user!} />
      <Button title="Sign Out" onPress={() => clearSession()} />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
    gap: 40,
  },
})
