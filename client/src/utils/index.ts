const IMAGE_API_ENDPOINT = 'https://api.dicebear.com/8.x/micah/svg'

export const getProfileImageUrl = (index: number): string => {
  return `${IMAGE_API_ENDPOINT}?seed=${index}`
}
