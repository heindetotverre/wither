import { reactive, readonly, } from "vue"
import { Page, User } from '~~/types'
import { createId } from "~~/utils"
import { authStore } from "./auth"
import { useQuery } from "@urql/vue"
import { generalStore } from "./index"

// externals
const initialState = {
  clientHandle: {} as any,
  currentPage: {} as Page,
  pages: [] as Array<Page>,
  user: {} as User
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

const fetchAdmin = async () => {
  const tokenId = authStore.get.getTokenId()
  if (!process.client || !state.pages.length) {
    try {
      const { data } = await useAsyncData('pages', async () => useQuery({
        query: `{
            getPages {
              name
              slug
              id
              components
              parent
            }
            getSingleUser(tokenId: "${tokenId}") {
              firstName
              lastName
              email
            }
         }`
      }))
      const pageData = (data.value.data as any).getPages
      const userData = (data.value.data as any).getSingleUser
      state.pages = pageData
      state.user = userData
      return pageData
    } catch (error) {
      console.log(error)
    }
  }
}

const getPages = computed(() => state.pages)

const getUser = computed(() => state.user)

const setPage = async (formContent: Page) => {
  const pageToInsert = await formatPageToInsert(formContent)
  try {
    const mutationPrep = generalStore.get.getClient().useMutation(`
      mutation {
        createPage (input: { 
          author: "${pageToInsert.author}"
          id: "${pageToInsert.id}"
          slug: "${pageToInsert.slug}"
          level: ${pageToInsert.level}
          name: "${pageToInsert.name}"
          parent: "${pageToInsert.parent}"
          components: "${pageToInsert.components}"
         }) {
          name
          slug
          id
          components
          parent
        }
      }`
    )
    const result = await mutationPrep.executeMutation(pageToInsert)
    if (result.data.createPage) {
      state.pages.push(result.data.createPage)
    }
    return result.data
  } catch (error) {
    console.log(error)
  }
}

const setUser = (user: User) => {
  state.user = user
}

// exports
export const adminStore = readonly({
  state: state,
  do: {
    deletePage,
    setPage,
    setUser
  },
  get: {
    fetchAdmin,
    getPages,
    getUser
  }
})

// internals
const formatPageToInsert = async (unformattedPage: Page): Promise<Page> => {
  const user: User = getUser.value
  const page = {
    author: user.email,
    slug: unformattedPage.slug,
    level: calculatePageLevel(unformattedPage),
    name: unformattedPage.name,
    id: createId('page'),
    parent: unformattedPage.parent,
    components: unformattedPage.components,
    meta: unformattedPage.meta
  }
  return page
}

const calculatePageLevel = (page: Page | void) => {
  return 0
}