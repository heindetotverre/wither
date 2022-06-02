import { reactive, readonly, } from "vue"
import { User } from '~~/types/types'
import { Errors, Group } from "~~/types/enums"
import { createUUID } from "~~/utils"

// externals
const initialState = {
  hasToken: false,
  tokenId: ''
}

const state = reactive({
  ...initialState
})

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
      await finishLogin(data.value.createToken.id as string, true)
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
      await finishLogin('', false)
    }
  } catch (error) {
    console.log(error)
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
    const { data } = await useAsyncData('deleteToken', async () => GqlCreateUser({ input: userPayload }))
    if (data.value.createUser) {
      await finishLogin(userPayload.id, true)
    }
    return data
  } catch (error) {
    console.log(error)
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
const finishLogin = async (data: string, set: boolean) => {
  await useFetch<any>('/setcookie', { method: 'POST', body: { secret: data, set: set } })
  state.hasToken = !state.hasToken
  state.tokenId = set
    ? data
    : ''
}