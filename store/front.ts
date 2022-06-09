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
  try {
    const { data } = await useAsyncData('fetchSinglePage', async () => GqlFetchSinglePage({slug: pageSlug}))

    const componentData = data.value.getComponentContentBySlug as [DynamicForm]
    const page = data.value.getSinglePage as Page

    componentData.forEach((content: DynamicForm) => {
      if (!formStore.get.getDynamicFormById(content.formInfo.name)) {
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

export const frontStore = readonly({
  state: state,
  get: {
    fetchSinglePage,
    getCurrentPage
  }
})