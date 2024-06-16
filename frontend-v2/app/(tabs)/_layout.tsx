import { Redirect, Tabs } from "expo-router"
import React, { useContext } from "react"

import { TabBarIcon } from "@/components/navigation/TabBarIcon"
import { SessionContext } from "@/providers/session"

export default function TabLayout() {
  const { user } = useContext(SessionContext)

  if (!user) {
    return <Redirect href="/sign-in" />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarStyle: {
          height: 70,
        },
        tabBarItemStyle: {
          bottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 16,
        },
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
