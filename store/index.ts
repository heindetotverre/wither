import { reactive, readonly } from "vue"

// externals
const initialState = {
  isLoggedIn: false
}

const state = reactive({
  ...initialState
})

const setLoginState = (loginState : boolean) => {
  state.isLoggedIn = loginState
}

const getLoginState = () => {
  return state.isLoggedIn
}

// exports
export const store = readonly({
  state: state,
  do: {
    setLoginState
  },
  get: {
    getLoginState
  }
})
// internals