export default defineNuxtRouteMiddleware(async (to) => {
  const { value } = useCookie('witherLoginToken') as any,
    tokenId = value?.id

  if (tokenId) {
    const { deleteToken, getToken } = useTokenization()
    const tokenMatchFromDb = await getToken(tokenId)
    if (!tokenMatchFromDb) {
      useCookie('witherLoginToken', { path: '/' , maxAge: 0})
      await deleteToken(tokenId)
      return navigateTo('/admin/login')
    }
    const now = new Date()
    const twoHours = 10800000
    if (tokenMatchFromDb?.created as number < (now.getTime() - twoHours)) {
      useCookie('witherLoginToken', { path: '/' , maxAge: 0})
      await deleteToken(tokenId)
      return navigateTo('/admin/login')
    }
  } else {
    if (to.fullPath.includes('admin') && to.fullPath !== '/admin/login') {
      return navigateTo('/admin/login')
    }
  }
})