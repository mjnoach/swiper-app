import { SessionContext } from "@/providers/session"
import { useContext } from "react"
import { StyleSheet, Text, View } from "react-native"

// TODO
// if no user session, display create account / login component

export default function Index() {
  const { user } = useContext(SessionContext)
  console.log("🚀 ~ Providers ~ user:", user)

  return (
    <View style={styles.container}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
