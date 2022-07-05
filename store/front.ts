import { reactive, readonly, } from "vue"
import { DynamicForm, Page } from '~~/types/types'
import { Errors } from "~~/types/enums"
import { formStore } from "./forms"
import { sanitzeComponentContent } from '~~/utils'

// externals
const initialState = {
  currentPage: {} as Page,
}

const state = reactive({
  ...initialState
})

const fetchSinglePage = async (pageSlug: string) => {
  if (state.currentPage.slug === pageSlug) {
    return state.currentPage
  }
  try {
    const { data } = await useAsyncData(`fetchSinglePage:${pageSlug}`, async () => GqlFetchSinglePage({slug: pageSlug})),
      componentData = data.value.getComponentContentBySlug as [DynamicForm],
      page = data.value.getSinglePage as Page
    componentData.forEach((content: DynamicForm) => {
      if (!formStore.get.getDynamicFormById(content.pageInfo.id)) {
        formStore.do.setDynamicForm(sanitzeComponentContent(content))
      }
    })
    state.currentPage = page
    return page
  } catch (error) {
    console.log(`${Errors.GQL_ERROR_GET_SINGLE_PAGE}: ${pageSlug} | ${error}`)
  }
}

const getCurrentPage = computed(() => state.currentPage)

const setCurrentPage = (page : Page) => {
  state.currentPage = page
}

export const frontStore = readonly({
  state: state,
  get: {
    fetchSinglePage,
    getCurrentPage
  },
  set: {
    setCurrentPage
  }
})