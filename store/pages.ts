import { reactive, readonly, } from "vue"
import { Page, User } from '~~/types'
import { createId } from "~~/utils"
import { userStore } from "./user"

// externals
const initialState = {
  pages: []
}

const state = reactive({
  ...initialState
})

const getPages = async (): Promise<Array<Page>> => {
  if (state.pages && state.pages.length) {
    return state.pages
  }
  const response = await useFetch<any>('/api/pages/getPages', {
    method: 'POST'
  })
  const data = typeof response.data.value === 'string'
    ? JSON.parse(response.data.value)
    : response.data.value
  if (data.message == 'NoPagesCreatedYet') {
    return []
  } else {
    const pages = data.pages
    state.pages = pages
    return pages
  }
}

const setPage = async (formContent: Page) => {
  const pageToInsert = await formatPageToInsert(formContent)
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
const formatPageToInsert = async (unformattedPage): Promise<Page> => {
  const user: User = await userStore.get.getUser()
  const page = {
    author: user.Email,
    slug: unformattedPage.Slug,
    level: calculatePageLevel(unformattedPage),
    name: unformattedPage.Name,
    id: createId('page'),
    children: calculateChildren(),
    components: unformattedPage.components,
    meta: unformattedPage.meta
  }
  return page
}

const calculateChildren = () => {
  return []
}

const calculatePageLevel = (page) => {
  return 0
}