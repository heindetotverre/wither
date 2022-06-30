import { main as constants } from '~~/constants/main.constants'
import { authStore } from '~~/store/auth' 
import { CookieRef } from 'nuxt/dist/app/composables'

export default defineNuxtRouteMiddleware(async (to) => {
  const { value = '' } = useCookie(constants.cookieName) as CookieRef<string>,
    tokenIdFromCookie = value,
    tokenIdFromStore = authStore.get.getTokenId()

  if (tokenIdFromStore) {
    return
  }

  if (tokenIdFromCookie) {
    const { getToken } = useTokenization()
    const tokenMatchFromDb = await getToken(tokenIdFromCookie)
    if (!tokenMatchFromDb) {
      await deleteCookie(tokenIdFromCookie)
      return navigateTo('/admin/login')
    }
    const now = new Date()
    const twoHours = 10800000
    if (tokenMatchFromDb?.created as number < (now.getTime() - twoHours)) {
      await deleteCookie(tokenIdFromCookie)
      return navigateTo('/admin/login')
    }
    await authStore.do.setTokenState(tokenIdFromCookie)
  } else {
    if (to.fullPath.includes('admin') && to.fullPath !== '/admin/login') {
      return navigateTo('/admin/login')
    }
  }
})

const deleteCookie = async (token : string) => {
  const { deleteToken } = useTokenization()
  authStore.do.setTokenState('')
  const newCookie = useCookie(constants.cookieName, { maxAge: 0 })
  newCookie.value = ''
  await deleteToken(token)
}