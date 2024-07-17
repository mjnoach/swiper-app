import { Button } from "@/components/Button"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { api } from "@/lib/api"
import { useSession } from "@/providers/session"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { Link, router, usePathname } from "expo-router"
import React, { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

export default function SignInScreen() {
  const { setSession } = useSession()
  const [email, setEmail] = useState("test1@mail.com")
  const [password, setPassword] = useState("")
  const [passwordHidden, setPasswordHidden] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const pathname = usePathname()
  const [isLoading, setLoading] = useState(false)
  const { user } = useSession()

  useEffect(() => {
    if (!!user) router.replace("/user")
  }, [user])

  useEffect(() => {
    setErrorMessage(null)
    setLoading(false)
  }, [pathname])

  useEffect(() => {
    setErrorMessage(null)
  }, [email, password])

  function validateInputs() {
    const emailRegex = /^\S+@\S+$/
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email address")
      return false
    }
    if (!password) {
      setErrorMessage("Password is required")
      return false
    }
    return true
  }

  async function handleSubmit() {
    if (!validateInputs()) return setLoading(false)
    const res = await api
      .login(email, password)
      .catch(({ message }: Error) => setErrorMessage(message))
      .finally(() => setLoading(false))
    if (!res) return
    const { data } = res
    await setSession(data.user, data.jwt)
    router.replace("/user")
  }

  return (
    <ThemedView style={styles.container} withScroll>
      <ThemedText type="title">Log in</ThemedText>
      {errorMessage && (
        <Animated.View entering={FadeIn.duration(100)}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </Animated.View>
      )}
      <View>
        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput
          id="email"
          autoComplete="email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text.trim())}
          textContentType="emailAddress"
        />
      </View>
      <View>
        <ThemedText style={styles.label}>Password</ThemedText>
        <View>
          <TextInput
            id="current-password"
            autoComplete="current-password"
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text.trim())}
            secureTextEntry={passwordHidden}
          />
          <LinearGradient
            colors={["transparent", "rgb(242, 242, 242)"]}
            start={{ x: 0, y: 1 }}
            locations={[0, 0.3]}
            style={styles.iconContainer}
          >
            <Pressable onPress={() => setPasswordHidden(!passwordHidden)}>
              <Ionicons
                size={28}
                style={styles.icon}
                name={passwordHidden ? "eye-off-outline" : "eye-outline"}
                color="black"
              />
            </Pressable>
          </LinearGradient>
        </View>
      </View>
      <Button
        style={[styles.button, { opacity: isLoading ? 0.5 : 1 }]}
        onPress={() => {
          if (isLoading) return
          setLoading(true)
          handleSubmit()
        }}
        title={"Sign in"}
      />
      <Link href="/sign-up">
        <ThemedText style={styles.text} type="link">
          Create a new account
        </ThemedText>
      </Link>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingVertical: 350,
  },
  label: {
    color: "rgb(98,98,98)",
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 12,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    width: 250,
  },
  iconContainer: {
    position: "absolute",
    right: 2,
    top: 2,
    bottom: 2,
    paddingRight: 10,
    paddingLeft: 20,
    justifyContent: "center",
  },
  icon: {
    color: "rgb(168,168,168)",
    fontSize: 22,
  },
  button: {
    marginVertical: 10,
  },
  text: {},
  errorText: {
    marginTop: 20,
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
})
