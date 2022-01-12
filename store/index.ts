import { reactive, readonly, } from "vue"
import { User, ServerResponseMessage } from '~~/types'

// externals
const initialState = {
  isLoggedIn: false
}

const state = reactive({
  ...initialState
})

const login = async (formContent) => {
  const { data } = await useFetch('/api/auth/login', {
    method: 'POST',
    body: {
      data: formContent
    }
  })
  setLoginState(true)
  return data.value
}

const register = async (formContent: User): Promise<ServerResponseMessage> => {
  if (formContent.Password === formContent.PasswordCheck) {
    try {
      const { data } = await useFetch('/api/auth/register', {
        method: 'POST',
        body: {
          data: formContent
        }
      })
      setLoginState(true)
      if (data.value && data.value.message === 'UserRegistrated') {
        return data.value
      } else {
        throw new Error
      }
    } catch (error) {
      return error
    }
  } else {
    return {
      message: 'UserNotRegistrated',
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