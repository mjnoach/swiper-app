import { Image, StyleSheet, Text, View } from "react-native"

export function Header() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: "./assets/images/logo.png" }}
      />
      <Text style={styles.text}>Swiper App</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderBottomColor: "rgb(216, 216, 216)",
    borderBottomWidth: 1,
  },
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
