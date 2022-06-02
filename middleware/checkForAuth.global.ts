// import { Errors } from '~~/types/enums'

// const fetchToken = async (tokenId : string) => {
//   try {
//     const result = await GqlFetchToken({tokenId: tokenId})
//     return result
//   } catch (e) {
//     console.log(`${Errors.DB_ERROR_GET_TOKEN}: ${e}`)
//   }
// }

// const deleteToken = async (tokenId : string) => {
//   try {
//     await GqlDeleteToken({tokenId: tokenId})
//   } catch (e) {
//     console.log(`${Errors.DB_ERROR_DELETE_TOKEN}: ${e}`)
//   }
// }

export default defineNuxtRouteMiddleware(async (to) => {
  const { value } = useCookie('witherLoginToken') as any,
    tokenId = value?.id
  if (tokenId) {
    // const tokenMatchFromDb = await fetchToken(tokenId)
    // if (!tokenMatchFromDb) {
    //   useCookie('witherLoginToken', { path: '/' , maxAge: 0})
    //   return navigateTo('/admin/login')
    // } else {
    //   const now = new Date()
    //   const twoHours = 10800000
    //   if (tokenMatchFromDb.getToken?.created as number < (now.getTime() - twoHours)) {
    //     await deleteToken(tokenId)
    //     useCookie('witherLoginToken', { path: '/' , maxAge: 0})
    //     return navigateTo('/admin/login')
    //   } else {
    //     if (to.fullPath.includes('admin/login')) {
    //       return navigateTo('/admin')
    //     }
    //   }
    // }
    const now = new Date()
    const twoHours = 10800000
    if (value.created as number < (now.getTime() - twoHours)) {
      useCookie('witherLoginToken', { path: '/' , maxAge: 0})
      return navigateTo('/admin/login')
    }
  } else {
    if (to.fullPath.includes('admin') && to.fullPath !== '/admin/login') {
      return navigateTo('/admin/login')
    }
  }
})