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

const deletePage = async (pageId) => {
  const response = await useFetch<any>('/api/pages/deletePage', {
    method: 'POST',
    body: {
      data: pageId
    }
  })
  if (response.data.value?.message === 'PageDeleted') {
    state.pages = state.pages.filter(page => {
      return page.id !== pageId
    })
  }
  return response
}

const fetchPages = async () => {
  // only fetch when neccessary
  if (!process.client || !state.pages.length) {
    const { data } = await useAsyncData('pages', () => $fetch('/api/pages/getPages', {
      method: 'POST'
    }))
    if (typeof data.value === 'string') {
      const pageData = JSON.parse(data.value)
      state.pages = pageData.pages
      return state.pages
    }
  }
}

const getPages = computed(() => {
  return state.pages
})

const setPage = async (formContent: Page) => {
  const pageToInsert = await formatPageToInsert(formContent)
  const response = await useFetch<any>('/api/pages/setPage', {
    method: 'POST',
    body: {
      data: pageToInsert
    }
  })
  if (response.data.value?.message === 'PageInserted') {
    state.pages.push(response.data.value?.page)
  }
  return response
}

// exports
export const pageStore = readonly({
  state: state,
  do: {
    deletePage,
    setPage
  },
  get: {
    fetchPages,
    getPages
  }
})

// internals
const formatPageToInsert = async (unformattedPage): Promise<Page> => {
  const user: User = await userStore.get.getUser
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