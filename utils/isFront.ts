export const isFront = () => {
  const urlPath = useRoute().path
  return !urlPath.includes('admin')
}