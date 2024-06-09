import { Logo } from "@/components/Logo"
import { Providers } from "@/providers"
import { Stack } from "expo-router"

export default function RootLayout() {
  return (
    <Providers>
      <Stack
        screenOptions={{
          headerTitle: (props) => <Logo />,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{}} />
      </Stack>
    </Providers>
  )
}
