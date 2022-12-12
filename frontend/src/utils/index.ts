export const getProfileImageUrl = (index: number): string => {
  const IMAGE_API_ENDPOINT = 'https://avatars.dicebear.com/api/micah'
  let url = IMAGE_API_ENDPOINT
  url += `/${index}.svg`
  return url
}
