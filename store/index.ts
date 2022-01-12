import { reactive, readonly, } from "vue"

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

const register = async (formContent) => {
  const { data } = await useFetch('/api/auth/register', {
    method: 'POST',
    body: {
      data: formContent
    }
  })
  setLoginState(true)
  return data.value
}

const setLoginState = (loginState : boolean) => {
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