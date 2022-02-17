import { reactive, readonly, } from "vue"
import { Page, User } from '~~/types/types'
import { createId } from "~~/utils"
import { authStore } from "./auth"
import { useQuery } from "@urql/vue"
import { generalStore } from "./index"

// externals
const initialState = {
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
          isInMenu
          pageComponents
          pageMenuParent
          pageMenuOrder
          title
          description
          keywords
          id
          author
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

const getPages = () => state.pages

const getUser = () => state.user

const setPage = async (formContent: Page) => {
  const pageToInsert = await formatPageToInsert(formContent)
  try {
    const mutationPrep = generalStore.get.getClient().useMutation(`
      mutation ($input: PageInput) {
        createPage (input: $input) {
          name
          slug
          isInMenu
          pageComponents
          pageMenuParent
          pageMenuOrder
          title
          description
          keywords
          id
          author
        }
      }`
    )
    const { data } = await mutationPrep.executeMutation({ input: pageToInsert })
    if (data.createPage) {
      const existingPage = state.pages.find(p => p.id === data.createPage.id)
      if (existingPage) {
        Object.assign(existingPage, data.createPage)
      } else {
        state.pages.push(data.createPage)
      }
    }
    return data
  } catch (error) {
    console.log(error)
  }
}

const updateUserInfo = async (formContent: User) => {
  if (formContent.password && formContent.password !== formContent.passwordCheck) {
    return {
      errors: {
        message: "Passwords do not match"
      }
    }
  }
  delete formContent.passwordCheck
  try {
    const user = {
      ...getUser(),
      ...formContent
    }
    delete user.__typename
    const mutationPrep = generalStore.get.getClient().useMutation(`
      mutation ($input: UserInput) {
        editUser (input: $input ) {
          firstName
          lastName
          email
          id
        }
      }`
    )
    const { data } = await mutationPrep.executeMutation({ input: user })
    Object.assign(state.user, data.editUser)
    return data
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
    updateUserInfo
  },
  get: {
    fetchAdmin,
    getPages,
    getUser
  }
})

// internals
const formatPageToInsert = async (unformattedPage: Page): Promise<Page> => {
  const user: User = getUser()
  const page = {
    name: unformattedPage.name,
    slug: unformattedPage.slug,
    isInMenu: unformattedPage.isInMenu,
    pageMenuParent: unformattedPage.pageMenuParent,
    pageMenuOrder: calculatePageLevel(unformattedPage.pageMenuOrder),
    title: unformattedPage.title,
    description: unformattedPage.description,
    keywords: unformattedPage.keywords,
    pageComponents: unformattedPage.pageComponents,
    id: createId('page'),
    author: user.email
  }
  return page
}

const calculatePageLevel = (page: number) => {
  return 0
}