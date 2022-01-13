import { reactive, readonly, } from "vue"
import { User } from '~~/types'

// externals
const initialState = {
  isLoggedIn: false
}

const state = reactive({
  ...initialState
})

const login = async (formContent) => {
  const response = await useFetch('/api/auth/login', {
    method: 'POST',
    body: {
      data: formContent
    }
  })
  setLoginState(true)
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

const setLoginState = (loginState: boolean) => {
  state.isLoggedIn = loginState
}

const getLoginState = computed(() => {
  return state.isLoggedIn
})

// exports
export const store = readonly({
  state: state,
  do: {
    login,
    register,
    setLoginState
  },
  get: {
    getLoginState
  }
})

// internals