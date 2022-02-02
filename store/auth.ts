import { reactive, readonly, } from "vue"
import { UserForm, LoginForm } from '~~/types'
import { Group } from "~~/types/enums"
import { createUUID } from "~~/utils"
import { generalStore } from "./index"

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

const login = async (formContent: LoginForm) => {
  try {
    const loginPayload = {
      id: createUUID(),
      user: formContent.email,
      password: formContent.password
    }
    const mutationPrep = generalStore.get.getClient().useMutation(`
      mutation ($input: TokenInput) {
        createToken (input: $input) {
          id
        }
      }`
    )
    const result = await mutationPrep.executeMutation({ input: loginPayload })
    if (result.data.createToken) {
      await finishLogin(result.data.createToken.id, true)
    }
    return result
  } catch (error) {
    console.log(error)
    return error
  }
}

const logout = async () => {
  try {
    const mutationPrep = generalStore.get.getClient().useMutation(`
      mutation ($id: String) {
        deleteToken (id: $id ) {
          id
        }
      }`
    )
    const result = await mutationPrep.executeMutation({ id: state.tokenId })
    if (result.data.deleteToken) {
      await finishLogin('', false)
    }
  } catch (error) {
    console.log(error)
  }
}

const register = async (formContent: UserForm) => {
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
      group: Group.Default,
      id: createUUID(),
      ...formContent
    }
    const mutationPrep = generalStore.get.getClient().useMutation(`
      mutation ($input: UserInput) {
        createUser (input: $input) {
          email
        }
      }`
    )
    const result = await mutationPrep.executeMutation({ input: userPayload })
    if (result.data.createUser) {
      await finishLogin(userPayload.id, true)
    }
    return result
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
  await useFetch<any>('/auth', { method: 'POST', body: { secret: data, set: set } })
  state.hasToken = !state.hasToken
  state.tokenId = set
    ? data
    : ''
}