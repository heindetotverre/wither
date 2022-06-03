import { reactive, readonly, } from "vue"
import { DynamicForm, Page } from '~~/types/types'
import { Errors } from "~~/types/enums"
import { formStore } from "./forms"
import { sanitzeContent } from '~~/utils'

// externals
const initialState = {
  currentPage: {} as Page,
}

const state = reactive({
  ...initialState
})

const fetchSinglePage = async (currentPageSlug: string) => {
  try {
    const { data } = await useAsyncData('fetchSinglePage', async () => GqlFetchSinglePage({slug: currentPageSlug}))

    const componentData = data.value.getComponentContentBySlug as [DynamicForm]
    const page = data.value.getSinglePage as Page

    componentData.forEach((content: DynamicForm) => {
      if (!formStore.get.getDynamicFormById(content.formInfo.name)) {
        formStore.do.setDynamicForm(sanitzeContent(content))
      }
    })
    state.currentPage = page
    return page
  } catch (error) {
    console.log(`${Errors.GQL_ERROR_GET_SINGLE_PAGE}: ${currentPageSlug} | ${error}`)
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