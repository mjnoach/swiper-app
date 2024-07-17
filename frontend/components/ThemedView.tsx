import {
  SafeAreaView,
  type SafeAreaViewProps,
} from "react-native-safe-area-context"

import { useThemeColor } from "@/hooks/useThemeColor"
import { ScrollView } from "react-native"

export type ThemedViewProps = SafeAreaViewProps & {
  lightColor?: string
  darkColor?: string
  withScroll?: boolean
}

export function ThemedView({
  withScroll,
  style,
  lightColor,
  darkColor,
  children,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  )

  if (withScroll)
    return (
      <SafeAreaView style={[{ flex: 1 }]}>
        <ScrollView
          contentContainerStyle={[{ backgroundColor }, style]}
          {...otherProps}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    )

  return (
    <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps}>
      {children}
    </SafeAreaView>
  )
}
