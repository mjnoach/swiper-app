import { Image, StyleSheet, Text, View } from "react-native"

export function Logo() {
  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        style={styles.image}
        source={{ uri: "./assets/images/logo.png" }}
      />
      <Text style={styles.text}>Swiper App</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  text: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
  },
})
