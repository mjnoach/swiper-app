import { Button } from "@/components/Button"
import { ProfileCard } from "@/components/ProfileCard"
import { ThemedView } from "@/components/ThemedView"
import { useSession } from "@/providers/session"
import { StyleSheet } from "react-native"

export default function UserTab() {
  const { user, clearSession } = useSession()

  return (
    <ThemedView style={styles.container} withScroll>
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
    gap: 40,
    paddingVertical: 350,
  },
})
