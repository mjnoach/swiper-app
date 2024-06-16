import { Link, Stack } from "expo-router"
import { StyleSheet } from "react-native"

import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{}} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href="/">
          <ThemedText style={styles.text} type="link">
            Go to home screen!
          </ThemedText>
        </Link>
      </ThemedView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 15,
  },
  text: {
    fontSize: 22,
    lineHeight: 55,
  },
})
