import { Button } from "@/components/Button"
import { ProfileCard } from "@/components/ProfileCard"
import { SessionContext } from "@/providers/session"
import { useContext } from "react"
import { GestureResponderEvent, StyleSheet, View } from "react-native"

export default function UserTab() {
  const { user } = useContext(SessionContext)

  if (!user) return null

  return (
    <View style={styles.container}>
      <ProfileCard profile={user} />
      <Button
        title="Sign Out"
        onPress={function (event: GestureResponderEvent): void {
          // TODO
          console.log("🚀 ~ UserTab ~ event:", event)
        }}
      />
    </View>
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
