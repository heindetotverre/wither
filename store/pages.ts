import { reactive, readonly, } from "vue"
import { Page } from '~~/types'

// externals
const initialState = {
  pages: []
}

const state = reactive({
  ...initialState
})

const getPages = async (): Promise<Array<Page>> => {
  const response = await useFetch<any>('/api/pages/getPages', {
    method: 'POST'
  })
  const pages = response.data.value?.message === 'PagesReturned'
    ? response.data.value
    : []
  state.pages = pages
  return pages
}

const setPage = async (formContent: Page) => {
  const pageToInsert = formatPageToInsert(formContent)
  const response = await useFetch<any>('/api/pages/setPage', {
    method: 'POST',
    body: {
      data: pageToInsert
    }
  })
  return response
}

// exports
export const pageStore = readonly({
  state: state,
  do: {
    setPage
  },
  get: {
    getPages
  }
})

// internals
const formatPageToInsert = (unformattedPage) => {
  return unformattedPage
}