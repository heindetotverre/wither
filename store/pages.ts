import { reactive, readonly, } from "vue"
import { Page, User } from '~~/types'
import { createId } from "~~/utils"
import { userStore } from "./user"
import { useQuery } from "@urql/vue"

// externals
const initialState = {
  currentPage: {} as Page,
  pages: [] as Array<Page>
}

const state = reactive({
  ...initialState
})

const deletePage = async (pageId: string) => {
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
  if (!process.client || !state.pages.length) {
    const { data } = await useAsyncData('pages', async () => useQuery({
      query: `{
          getPages {
            name
            slug
            components
            children {
              name
            }
          }
       }`
    }))
    const pages = (data.value.data as any).getPages
    state.pages = pages
    return pages
  }
}

const fetchSinglePage = async (currentPageUrl: string) => {
  const { data } = await useAsyncData('page', () => $fetch('/api/pages/getSinglePage', {
    method: 'POST',
    body: {
      data: currentPageUrl
    }
  }))
  const pageData = typeof data.value === 'string'
    ? JSON.parse(data.value)
    : data.value
  state.currentPage = pageData.page
  return state.currentPage
}

const getPages = computed(() => state.pages)

const getCurrentPage = computed(() => state.currentPage)

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
    fetchSinglePage,
    getCurrentPage,
    getPages
  }
})

// internals
const formatPageToInsert = async (unformattedPage: Page): Promise<Page> => {
  const user: User = await userStore.get.getUser
  const page = {
    author: user.email,
    slug: unformattedPage.slug,
    level: calculatePageLevel(unformattedPage),
    name: unformattedPage.name,
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

const calculatePageLevel = (page: Page | void) => {
  return 0
}