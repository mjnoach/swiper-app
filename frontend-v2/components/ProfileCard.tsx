import { getProfileImageUrl } from "@/lib/utils"
import { style } from "@/lib/utils/style"
import { User } from "@/types"
import React from "react"
import { DimensionValue, Image, StyleSheet, Text, View } from "react-native"

type ProfileCardProps = {
  profile: User
}

// TODO
// adjust layout & styles for small mobile devices

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: getProfileImageUrl(profile.id) }}
      />
      <View style={styles.info}>
        <Text numberOfLines={1} style={[styles.text, styles.textTop]}>
          {profile.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text numberOfLines={1} style={[styles.text, styles.textBottom]}>
            {profile.age}
          </Text>
          <Text numberOfLines={1} style={[styles.text, styles.textBottom]}>
            id: {profile.id}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: "3/4",
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 25,
    shadowOpacity: 0.2,
    userSelect: "none",
    width: style.windowWidth<DimensionValue>({
      small: 300,
      default: 400,
    }),
  },
  image: {
    height: "75%",
    marginTop: 10,
  },
  info: {
    flexGrow: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 30,
  },
  textTop: {
    fontSize: style.windowWidth<number>({
      small: 26,
      default: 32,
    }),
    paddingTop: 10,
  },
  textBottom: {
    paddingBottom: 20,
  },
})
