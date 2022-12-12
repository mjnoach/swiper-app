export const getProfileImageUrl = (gender: string, index: number): string => {
  const IMAGE_API_ENDPOINT =
    'https://xsgames.co/randomusers/assets/avatars/pixel'
  let url = IMAGE_API_ENDPOINT
  url += `/${index}.jpg`
  return url
}
