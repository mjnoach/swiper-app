const IMAGE_API_ENDPOINT = "https://api.dicebear.com/8.x/micah/svg"

export const getProfileImageUrl = (index: number): string => {
  return `${IMAGE_API_ENDPOINT}?seed=${index}`
}

export function getRandomInt(min: number, max: number) {
  if (min > max)
    throw new Error(
      "The min value should be less than or equal to the max value.",
    )
  return Math.floor(Math.random() * (max - min + 1)) + min
}
