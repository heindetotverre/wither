import { reactive, readonly, } from "vue"
import { User } from '~~/types'
import { useCookie } from "nuxt3"

// externals
const initialState = {
  hasToken: false
}

const state = reactive({
  ...initialState
})

const setTokenState = (hasToken : boolean) => {
  state.hasToken = hasToken
}

const login = async (formContent) => {
  const response = await useFetch('/api/auth/login', {
    method: 'POST',
    body: {
      data: formContent
    }
  })
  setTokenState(true)
  return response
}

const register = async (formContent: User) => {
  if (formContent.Password === formContent.PasswordCheck) {
    const response = await useFetch('/api/auth/register', {
      method: 'POST',
      body: {
        data: formContent
      }
    })
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
    register,
    setTokenState
  },
  get: {
    getTokenState
  }
})

// internals