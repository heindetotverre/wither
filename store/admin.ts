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
  try {
    const mutationPrep = generalStore.get.getClient().useMutation(`
      mutation ($id: String) {
        deletePage (id: $id ) {
          name
        }
      }`
    )
    const result = await mutationPrep.executeMutation({ id: pageId })
    if (result.data.deletePage) {
      state.pages = state.pages.filter(page => {
        return page.id !== pageId
      })
    }
    return result.data
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = async (userId: string) => {
  try {
    const mutationPrep = generalStore.get.getClient().useMutation(`
      mutation ($id: String) {
        deleteUser (id: $id ) {
          id
        }
      }`
    )
    const result = await mutationPrep.executeMutation({ id: userId })
    if (result.data.deleteUser) {
      authStore.do.logout()
      state.user = {} as User
    }
    return result.data
  } catch (error) {
    console.log(error)
  }
}

const fetchAdmin = async () => {
  try {
    const tokenId = authStore.get.getTokenId()
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
          id
        }
      }`
    }))
    const pageData = (data.value.data as any).getPages,
      userData = (data.value.data as any).getSingleUser

    state.pages = pageData
    state.user = userData
    return pageData
  } catch (error) {
    console.log(error)
  }
}

const getPages = computed(() => state.pages)

const getUser = computed(() => state.user)

const setPage = async (formContent: Page) => {
  const pageToInsert = await formatPageToInsert(formContent)
  try {
    const mutationPrep = generalStore.get.getClient().useMutation(`
      mutation ($input: PageInput) {
        createPage (input: $input) {
          name
          slug
          id
          components
          parent
        }
      }`
    )
    const result = await mutationPrep.executeMutation({ input: pageToInsert })
    if (result.data.createPage) {
      let existingPage = state.pages.filter(p => p.id === result.data.createPage.id)
      if (existingPage) {
        existingPage = result.data.createPage
      } else {
        state.pages.push(result.data.createPage)
      }
    }
    return result.data
  } catch (error) {
    console.log(error)
  }
}

const updateUserInfo = async (formContent: User) => {
  try {
    const user = {
      ...formContent,
      group: getUser.value.group,
      password: getUser.value.password
    }
    const mutationPrep = generalStore.get.getClient().useMutation(`
      mutation ($input: UserInput) {
        editUser (input: $input ) {
          firstName
          lastName
          email
        }
      }`
    )
    const result = await mutationPrep.executeMutation({ input: user })
    if (result.data.editUser) {
      state.user = {
        ...state.user,
        ...result.data.editUser
      }
    }
    return result.data
  } catch (error) {
    console.log(error)
  }
}

const updateUserCredentials = async (formContent: User) => {
  try {
    const user = {
      ...formContent,
      group: getUser.value.group,
      firstName: getUser.value.firstName,
      lastName: getUser.value.lastName,
      email: getUser.value.email
    }
    const mutationPrep = generalStore.get.getClient().useMutation(`
      mutation ($input: UserInput) {
        editUser (input: $input ) {
          password
        }
      }`
    )
    const result = await mutationPrep.executeMutation({ input: user })
    if (result.data.editUser) {
      state.user = {
        ...state.user,
        ...result.data.editUser
      }
    }
    return result.data
  } catch (error) {
    console.log(error)
  }
}

// exports
export const adminStore = readonly({
  state: state,
  do: {
    deletePage,
    deleteUser,
    setPage,
    updateUserInfo,
    updateUserCredentials
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