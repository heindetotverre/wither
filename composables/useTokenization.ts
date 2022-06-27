import { Errors } from "~~/types/enums"

const useTokenization = () => {
  const getToken = async (tokenId : string) => {
    try {
      const { data } = await useAsyncData('fetchToken', async () => GqlFetchToken({ tokenId: tokenId }))
      if (data.value?.getToken) {
        return data.value?.getToken
      }
    } catch (error) {
      console.log(`${Errors.GQL_ERROR_GET_TOKEN} ${tokenId} | ${error}`)
    }
  }

  const deleteToken = async (tokenId : string) => {
    try {
      const { data } = await useAsyncData('deleteToken', async () => GqlDeleteToken({ tokenId: tokenId }))
      if (data.value?.deleteToken) {
        return data.value?.deleteToken
      }
    } catch (error) {
      console.log(`${Errors.GQL_ERROR_DELETE_TOKEN} ${tokenId} | ${error}`)
    }
  }

  return {
    deleteToken,
    getToken
  }
}

export default useTokenization