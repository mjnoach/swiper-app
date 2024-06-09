import { Tabs, router, useRootNavigationState } from "expo-router"
import React, { useContext, useEffect } from "react"

import { Logo } from "@/components/Logo"
import { TabBarIcon } from "@/components/navigation/TabBarIcon"
import { SessionContext } from "@/providers/session"

export default function TabLayout() {
  const { user } = useContext(SessionContext)
  const rootNavigationState = useRootNavigationState()
  const navigatorReady = rootNavigationState?.key != null

  useEffect(() => {
    if (!navigatorReady) return
    if (!user) router.replace("/")
  }, [navigatorReady, user])

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors["light"].tint,
        tabBarActiveTintColor: "black",
        headerTitle: (props) => <Logo />,
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "planet" : "planet-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
