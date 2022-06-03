const useTokenization = () => {
  const getToken = async (tokenId : string) => {
    const { data } = await useAsyncData('fetchToken', async () => GqlFetchToken({ tokenId: tokenId }))
    if (data.value.getToken) {
      return data.value.getToken
    }
  }

  const deleteToken = async (tokenId : string) => {
    const { data } = await useAsyncData('deleteToken', async () => GqlDeleteToken({ tokenId: tokenId }))
    if (data.value.deleteToken) {
      return data.value.deleteToken
    }
  }

  return {
    deleteToken,
    getToken
  }
}

export default useTokenization