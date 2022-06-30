import { reactive, readonly, } from "vue"
import { DynamicForm, Page, User } from '~~/types/types'
import { Errors } from "~~/types/enums"
import { createId, sanitzeComponentContent } from "~~/utils"
import { authStore } from "./auth"
import { formStore } from "./forms"
import { contentStore } from "./content"

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
    const { data } = await useAsyncData('deletePage', async () => GqlDeletePage({ id: pageId }))
    if (data.value.deletePage) {
      state.pages = state.pages.filter(page => {
        return page.id !== pageId
      })
    }
    return data.value
  } catch (error) {
    console.log(`${Errors.GQL_ERROR_DELETE_PAGE}: ${pageId} | ${error}`)
  }
}

const deleteUser = async (userId: string) => {
  try {
    const { data } = await useAsyncData('deletePage', async () => GqlDeleteUser({ id: userId }))
    if (data.value.deleteUser) {
      authStore.do.logout()
      state.user = {} as User
    }
    return data.value
  } catch (error) {
    console.log(`${Errors.GQL_ERROR_DELETE_USER}: ${userId} | ${error}`)
  }
}

const fetchAdmin = async () => {
  try {
    const tokenId = authStore.get.getTokenId()
    const { data } = await useAsyncData('fetchAdminData', async () => GqlFetchAdminData({ tokenId: tokenId }))
    const pageData = data.value.getPages as [Page],
      userData = data.value.getSingleUser as User,
      componentContentData = data.value.getComponentContent as [DynamicForm]

    state.pages = pageData
    state.user = userData
    componentContentData.forEach((content: DynamicForm) => formStore.do.setDynamicForm(sanitzeComponentContent(content)))
    return pageData
  } catch (error) {
    console.log(`${Errors.GQL_ERROR_GET_ADMIN_DATA} | ${error}`)
  }
}

const fetchImagesPath = async (cacheKey : string) => {
  try {
    const { data } = await useAsyncData(cacheKey, () => $fetch('/getimages'))
    if (data.value) {
      return data.value
    }
  } catch(error) {

  }
}

const getPages = () => state.pages

const getUser = () => state.user

const setPage = async (formContent: Page) => {
  const pageComponentsContent = formStore.get.getAllDynamicFormsBySlug(formContent.slug) as [DynamicForm]
  const pageToInsert = await formatPageToInsert(formContent)
  try {
    for (const content of pageComponentsContent) {
      const { data } = await useAsyncData(content.formInfo.name, async () => GqlCreateComponentContent({ input: content }))
      if (!data.value.createComponentContent) {
        throw new Error()
      }
      formStore.do.setDynamicForm(content)
    }
    const { data } = await useAsyncData('createPage', async () => GqlCreatePage({ input: pageToInsert }))
    if (data.value.createPage) {
      const existingPage = state.pages.find(p => p.id === data.value.createPage?.id)
      if (existingPage) {
        Object.assign(existingPage, data.value.createPage)
      } else {
        state.pages.push(data.value.createPage as Page)
      }
    }
    return data
  } catch (error) {
    console.log(`${Errors.GQL_ERROR_SET_PAGE}: ${formContent.name} | ${error}`)
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
    const { data } = await useAsyncData('editUser', async () => GqlEditUser({ input: user }))
    Object.assign(state.user, data.value.editUser)
    return data
  } catch (error) {
    console.log(`${Errors.GQL_ERROR_UPDATE_USER}: ${formContent.id} | ${error}`)
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
    fetchImagesPath,
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