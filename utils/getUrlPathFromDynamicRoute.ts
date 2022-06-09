import { useRoute } from 'vue-router'

export const getUrlPathFromDynamicRoute = () => {
  const urlPath = useRoute().params.slug as Array<string>

  const index = urlPath.length
    ? urlPath.indexOf('')
    : -1

  if (index > 0) {
    urlPath.splice(index)
  }

  return {
    last: [...urlPath].pop(),
    first: urlPath[0],
    full: urlPath
  }
}
