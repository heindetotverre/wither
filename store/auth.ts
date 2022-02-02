import { reactive, readonly, } from "vue"
import { UserForm, LoginForm } from '~~/types'
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
      uuid: createUUID(),
      user: formContent.email,
      password: formContent.password
    }
    const mutationPrep = generalStore.get.getClient().useMutation(`
      mutation {
        createToken (input: { 
          user: "${loginPayload.user}"
          password: "${loginPayload.password}"
          uuid: "${loginPayload.uuid}"
        }) {
          uuid
        }
      }`
    )
    const result = await mutationPrep.executeMutation(loginPayload)
    if (result.data.createToken) {
      await useFetch<any>('/auth', {
        method: 'POST',
        body: {
          secret: result.data.createToken.uuid,
          set: true
        }
      })
      state.hasToken = true
      state.tokenId = result.data.createToken.uuid
    }
    return result
  } catch (error) {
    console.log(error)
    return error
  }
}

const logout = async () => {
  await useFetch<any>('/api/auth/logoutUser', {
    method: 'POST',
    body: {
      data: state.tokenId
    }
  })
  state.hasToken = false
  state.tokenId = ''
}

const register = async (formContent: UserForm) => {
  if (formContent.password === formContent.passwordCheck) {
    const response = await useFetch<any>('/api/auth/registerUser', {
      method: 'POST',
      body: {
        data: {
          group: 'default',
          ...formContent
        }
      }
    })
    if (response.data.value?.message === 'UserInserted') {
      const loginForm: LoginForm = {
        email: formContent.email,
        password: formContent.password
      }
      await login(loginForm)
    }
    return response
  } else {
    return {
      message: 'UserNotInserted',
      description: "Passwords do not match"
    }
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