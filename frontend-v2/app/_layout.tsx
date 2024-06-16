import { Header } from "@/components/Header"
import { Providers } from "@/providers"
import { Stack } from "expo-router"

export default function RootLayout() {
  return (
    <Providers>
      <Stack
        screenOptions={{
          header: (props) => <Header />,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </Providers>
  )
}
