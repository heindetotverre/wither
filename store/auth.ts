import { reactive, readonly, } from "vue"
import { User } from '~~/types/types'
import { Errors, Group } from "~~/types/enums"
import { createUUID } from "~~/utils"
import { main as constants } from '~~/constants/main.constants'

// externals
const initialState = {
  hasToken: false,
  tokenId: ''
}

const state = reactive({
  ...initialState
})

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

const fetchToken = async (tokenId : string) => {
  try {
    const { data } = await useAsyncData('fetchToken', async () => GqlFetchToken({ tokenId: tokenId }))
    if (data.value?.getToken) {
      return data.value?.getToken
    }
  } catch (error) {
    console.log(`${Errors.GQL_ERROR_GET_TOKEN} ${tokenId} | ${error}`)
  }
}

const getTokenId = () => state.tokenId

const getTokenState = () => state.hasToken

const login = async (formContent: User) => {
  try {
    const loginPayload = {
      id: createUUID(),
      user: formContent.email,
      password: formContent.password
    }
    const { data, error } = await useAsyncData('createToken', async () => GqlCreateToken({ input: loginPayload }))
    if (data.value?.createToken?.id) {
      finishAuth(data.value.createToken.id as string, true)
      return data.value
    }
    return error.value
  } catch (error) {
    console.log(`${Errors.GQL_ERROR_CREATE_TOKEN}: ${formContent.email} | ${error}`)
    return error
  }
}

const logout = async () => {
  try {
    const { data } = await useAsyncData('deleteToken', async () => GqlDeleteToken({ tokenId: state.tokenId }))
    if (data.value.deleteToken) {
      finishAuth('', false)
    }
  } catch (error) {
    console.log(`${Errors.GQL_ERROR_DELETE_TOKEN}: ${state.tokenId} | ${error}`)
  }
}

const register = async (formContent: User) => {
  if (formContent.password !== formContent.passwordCheck) {
    return {
      error: {
        message: "Passwords do not match"
      }
    }
  }
  delete formContent.passwordCheck
  try {
    const userPayload = {
      ...formContent,
      group: Group.Default,
      id: createUUID()
    }
    const { data } = await useAsyncData('createUser', async () => GqlCreateUser({ input: userPayload }))
    if (data.value.createUser) {
      finishAuth(userPayload.id, true)
    }
    return data
  } catch (error) {
    console.log(`${Errors.GQL_ERROR_CREATE_USER}: ${formContent.email} | ${error}`)
    return error
  }
}

const setTokenState = (tokenId: string) => {
  state.tokenId = tokenId
  state.hasToken = !!tokenId
}

// exports
export const authStore = readonly({
  state: state,
  do: {
    deleteToken,
    fetchToken,
    login,
    logout,
    register,
    setTokenState
  },
  get: {
    getTokenId,
    getTokenState
  }
})

// internals
const finishAuth = (data: string, set: boolean) => {
  const date = new Date()
  if (set) {
    date.setHours( date.getHours() + 2 )
    document.cookie = `${constants.cookieName}=${data}; expires=${date}; path=/`
    state.tokenId = data
    state.hasToken = true
  } else {
    date.setHours( date.getHours() - 2)
    document.cookie = `${constants.cookieName}=${data}; expires=${date}; path=/`
  }
  setTokenState(data)
}