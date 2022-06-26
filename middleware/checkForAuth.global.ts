import { main as constants } from '~~/constants/main.constants'
import { authStore } from '~~/store/auth' 

export default defineNuxtRouteMiddleware(async (to) => {
  const { value } = useCookie(constants.cookieName) as any,
    tokenId = value

  if (tokenId) {
    const { deleteToken, getToken } = useTokenization()
    const tokenMatchFromDb = await getToken(tokenId)
    if (!tokenMatchFromDb) {
      await authStore.do.setTokenState('')
      useCookie(constants.cookieName, { path: '/' , maxAge: 0})
      await deleteToken(tokenId)
      return navigateTo('/admin/login')
    }
    const now = new Date()
    const twoHours = 10800000
    if (tokenMatchFromDb?.created as number < (now.getTime() - twoHours)) {
      await authStore.do.setTokenState('')
      useCookie(constants.cookieName, { path: '/' , maxAge: 0})
      await deleteToken(tokenId)
      return navigateTo('/admin/login')
    }
    await authStore.do.setTokenState(tokenId)
  } else {
    if (to.fullPath.includes('admin') && to.fullPath !== '/admin/login') {
      return navigateTo('/admin/login')
    }
  }
})