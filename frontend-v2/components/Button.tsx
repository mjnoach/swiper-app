import React from "react"
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native"

type ButtonProps = {
  onPress: (event: GestureResponderEvent) => void
  title: string
  style?: StyleProp<ViewStyle>
}

export function Button(props: ButtonProps) {
  return (
    <Pressable style={[styles.button, props.style]} onPress={props.onPress}>
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
