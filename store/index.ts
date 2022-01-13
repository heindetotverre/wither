import { reactive, readonly, } from "vue"
import { UserForm, LoginForm } from '~~/types'

// externals
const initialState = {
  hasToken: false,
  tokenId: ''
}

const state = reactive({
  ...initialState
})

const setTokenState = (hasToken : string) => {
  state.hasToken = !!hasToken
}

const login = async (formContent : LoginForm) => {
  const response = await useFetch<any>('/api/auth/login', {
    method: 'POST',
    body: {
      data: formContent
    }
  })
  if (response.data.value) {
    state.hasToken = true
    state.tokenId = response.data.value.uuid
  }
  return response
}

const logout = async () => {
  console.log('logout')
  await useFetch<any>('/api/auth/logout', {
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
    const response = await useFetch<any>('/api/auth/register', {
      method: 'POST',
      body: {
        data: formContent
      }
    })
    const loginForm : LoginForm = {
      Email: formContent.Email,
      Password: formContent.Password
    }
    await login(loginForm)
    return response
  } else {
    return {
      message: 'UserNotInserted',
      description: "Passwords do not match"
    }
  }
}

const getTokenState = () => state.hasToken

// exports
export const store = readonly({
  state: state,
  do: {
    login,
    logout,
    register,
    setTokenState
  },
  get: {
    getTokenState
  }
})

// internals