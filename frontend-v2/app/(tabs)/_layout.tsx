import { Tabs } from "expo-router"
import React from "react"

import { Logo } from "@/components/Logo"
import { TabBarIcon } from "@/components/navigation/TabBarIcon"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors["light"].tint,
        tabBarActiveTintColor: "black",
        headerTitle: (props) => <Logo />,
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
