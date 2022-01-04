import { reactive, readonly, } from "vue"

// externals
const initialState = {
  isLoggedIn: false
}

const state = reactive({
  ...initialState
})

const login = async (formContent) => {
  const { data } = await useFetch('/api/auth', {
    method: 'POST',
    pick: ['result'],
    body: {
      data: formContent
    }
  })
  setLoginState(true)
  return data.value.result
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
    setLoginState
  },
  get: {
    getLoginState
  }
})

// internals