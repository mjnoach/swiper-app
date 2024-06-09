import React from "react"
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from "react-native"

type ButtonProps = {
  onPress: (event: GestureResponderEvent) => void
  title: string
}

export function Button(props: ButtonProps) {
  return (
    <Pressable style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
})
