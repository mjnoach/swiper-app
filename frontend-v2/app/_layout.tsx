import { Providers } from "@/providers"
import { Stack } from "expo-router"
import { Image, StyleSheet, Text, View } from "react-native"

function Logo() {
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

export default function RootLayout() {
  return (
    <Providers>
      <Stack
        screenOptions={{
          // headerStyle: { backgroundColor: "#eb5f5d" },
          headerTitle: (props) => <Logo />,
        }}
      >
        <Stack.Screen name="index" options={{}} />
        <Stack.Screen name="user" />
      </Stack>
    </Providers>
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
