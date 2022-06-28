import { main as constants } from '~~/constants/main.constants'
import { authStore } from '~~/store/auth' 

export default defineNuxtRouteMiddleware(async (to) => {
  const { value = '' } = useCookie(constants.cookieName) as any,
    tokenIdFromCookie = value,
    tokenIdFromStore = authStore.get.getTokenId()

  if (tokenIdFromStore) {
    return
  }

  if (tokenIdFromCookie) {
    const { deleteToken, getToken } = useTokenization()
    const tokenMatchFromDb = await getToken(tokenIdFromCookie)
    if (!tokenMatchFromDb) {
      const date = new Date()
      date.setHours( date.getHours() - 2)
      await authStore.do.setTokenState('')
      useCookie(constants.cookieName, { path: '/' , maxAge: 0})
      // document.cookie = `${constants.cookieName}=${tokenIdFromCookie}; expires=${date}; path=/`
      await deleteToken(tokenIdFromCookie)
      return navigateTo('/admin/login')
    }
    const now = new Date()
    const twoHours = 10800000
    if (tokenMatchFromDb?.created as number < (now.getTime() - twoHours)) {
      const date = new Date()
      date.setHours( date.getHours() - 2)
      await authStore.do.setTokenState('')
      useCookie(constants.cookieName, { path: '/' , maxAge: 0})
      // document.cookie = `${constants.cookieName}=${tokenIdFromCookie}; expires=${date}; path=/`
      await deleteToken(tokenIdFromCookie)
      return navigateTo('/admin/login')
    }
    await authStore.do.setTokenState(tokenIdFromCookie)
  } else {
    if (to.fullPath.includes('admin') && to.fullPath !== '/admin/login') {
      return navigateTo('/admin/login')
    }
  }
})