import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useSession } from "@/lib/session"
import { Link } from "expo-router"
import { StyleSheet } from "react-native"

export function withSession(WrappedComponent: React.ComponentType) {
  return function WithSession(props: any) {
    const { user } = useSession()

    if (!user)
      return (
        <ThemedView style={styles.container}>
          <Link href="/sign-in">
            <ThemedText style={styles.text} type="link">
              Log in
            </ThemedText>
          </Link>
          <ThemedText style={styles.text}> or </ThemedText>
          <Link href="/sign-up">
            <ThemedText style={styles.text} type="link">
              create a new account
            </ThemedText>
          </Link>
        </ThemedView>
      )

    return <WrappedComponent {...props} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    lineHeight: 45,
  },
})
