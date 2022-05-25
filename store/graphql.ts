import { reactive, readonly, } from "vue"
import { useClientHandle } from '@urql/vue'

// externals
const initialState = {
  clientHandle: {} as any
}

const state = reactive({
  ...initialState
})

const getClient = () => {
  return state.clientHandle
}

const setClient = () => {
  state.clientHandle = useClientHandle()
}

// exports
export const gqlStore = readonly({
  state: state,
  do: {
    setClient
  },
  get: {
    getClient
  }
})
