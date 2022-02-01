import { reactive, readonly, } from "vue"
import { UserForm, LoginForm } from '~~/types'
import { adminStore } from './admin'

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
  const response = await useFetch<any>('/api/auth/loginUser', {
    method: 'POST',
    body: {
      data: formContent
    }
  })
  if (response.data.value) {
    state.hasToken = true
    state.tokenId = response.data.value.tokenId
    adminStore.do.setUser(response.data.value.user)
  }
  return response
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