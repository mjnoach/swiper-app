import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

type WidthSizes = "small" | "default"
type HeightSizes = "small" | "default"

const widthSize = (): WidthSizes => {
  if (width <= 440) return "small"
  return "default"
}

const heightSize = (): HeightSizes => {
  if (height <= 400) return "small"
  return "default"
}

type WidthStyles<T> = { [key in WidthSizes]: T }
type HeightStyles<T> = { [key in HeightSizes]: T }

export const style = {
  windowWidth: <T>(styles: WidthStyles<T>): T => styles[widthSize()],
  windowHeight: <T>(styles: HeightStyles<T>): T => styles[heightSize()],
}
