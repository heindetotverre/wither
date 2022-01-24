import { reactive, readonly, } from "vue"
import { UserForm, LoginForm } from '~~/types'

// externals
const initialState = {
  hasToken: false,
  tokenId: '',
  user: {}
}

const state = reactive({
  ...initialState
})

const setTokenState = (tokenId: string) => {
  state.tokenId = tokenId
  state.hasToken = !!tokenId
}

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
    state.user = response.data.value.user
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
  if (formContent.Password === formContent.PasswordCheck) {
    const response = await useFetch<any>('/api/auth/registerUser', {
      method: 'POST',
      body: {
        data: {
          Group: 'default',
          ...formContent
        }
      }
    })
    if (response.data.value?.message === 'UserInserted') {
      const loginForm: LoginForm = {
        Email: formContent.Email,
        Password: formContent.Password
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

const getTokenState = () => state.hasToken

const getUser = async () => {
  if (Object.keys(state.user).length) {
    return state.user
  }
  const user = await getUserByTokenId()
  return user
}

// exports
export const userStore = readonly({
  state: state,
  do: {
    login,
    logout,
    register,
    setTokenState
  },
  get: {
    getTokenState,
    getUser
  }
})

// internals
const getUserByTokenId = async () => {
  const response = await useFetch<any>('/api/user/getUser', {
    method: 'POST',
    body: {
      data: state.tokenId
    }
  })
  if (response.data.value) {
    const user = typeof response.data.value === 'string'
      ? JSON.parse(response.data.value).user
      : response.data.value.user
    state.user = user
    return user
  }
}
