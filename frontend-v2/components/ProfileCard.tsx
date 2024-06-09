import { getProfileImageUrl } from "@/lib/utils"
import { User } from "@/types"
import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

type ProfileCardProps = {
  profile: User
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: getProfileImageUrl(profile.id) }}
      />
      <View style={styles.info}>
        <Text
          style={{
            ...styles.text,
            ...styles.textTop,
          }}
        >
          {profile.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...styles.text, ...styles.textBottom }}>
            {profile.age}
          </Text>
          <Text style={{ ...styles.text, ...styles.textBottom }}>
            id: {profile.id}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: "3/4",
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 25,
    shadowOpacity: 0.2,
    userSelect: "none",
  },
  image: {
    height: "75%",
  },
  info: {
    flexGrow: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 30,
  },
  textTop: {
    fontSize: 40,
    paddingTop: 10,
  },
  textBottom: {
    paddingBottom: 20,
  },
})
