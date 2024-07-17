import { Link, Stack } from "expo-router"
import { StyleSheet } from "react-native"

import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{}} />
      <ThemedView style={styles.container} withScroll>
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
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    padding: 20,
    paddingVertical: 350,
  },
  text: {
    lineHeight: 55,
  },
})
