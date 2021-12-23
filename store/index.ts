import { reactive, readonly, computed } from "vue"

// externals
const initialState = {

}

const state = reactive({
  ...initialState
})

// exports
export const store = readonly({
  state: state
})

// internals