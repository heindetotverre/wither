import { reactive, readonly, } from "vue"
import { User, UserForm, LoginForm } from '~~/types'

// externals
const initialState = {
  hasToken: false,
  tokenId: '',
  user: {} as User
}

const state = reactive({
  ...initialState
})

const fetchUser = async () => {
  // only fetch when neccessary
  if (!process.client || !Object.keys(state.user).length) {
    const { data } = await useAsyncData('user', () => $fetch('/api/user/getUser', {
      method: 'POST',
      body: {
        data: state.tokenId
      }
    }))
    let userData
    if (typeof data.value === 'string') {
      userData = JSON.parse(data.value)
    } else {
      userData = data.value
    }
    state.user = userData.user
    return state.user
  }
}

const getTokenState = () => state.hasToken

const getUser = computed(() => {
  return state.user
})

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
  console.log(formContent)
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
export const userStore = readonly({
  state: state,
  do: {
    login,
    logout,
    register,
    setTokenState
  },
  get: {
    fetchUser,
    getTokenState,
    getUser
  }
})