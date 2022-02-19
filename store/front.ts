import { reactive, readonly, } from "vue"
import { DynamicForm, Page } from '~~/types/types'
import { useQuery } from "@urql/vue"
import { formStore } from "./forms"
import { generalStore } from "."
import { contentStore } from "./content"

// externals
const initialState = {
  currentPage: {} as Page,
}

const state = reactive({
  ...initialState
})

const fetchSinglePage = async (currentPageSlug: string) => {
  try {
    const { data } = await useAsyncData('page', async () => useQuery({
      query: `{
          getSinglePage(slug: "${currentPageSlug}") {
            name
            pageComponents
            pageMenuParent
          }
          getComponentContentBySlug(slug: "${currentPageSlug}") {
            formInfo {
              name
              slug
            }
            fields {
              autocomplete
              class
              component
              disabled
              formPart
              id
              key
              label
              options
              type
              required
              validation {
                validator
                validated
                validationMessage
              }
              value
              visible
            }
          }
       }`
    }))
    const pageData = (data.value.data as any).getSinglePage
    const pageContent = (data.value.data as any).getComponentContentBySlug
    pageContent.forEach((content: DynamicForm) => formStore.do.setDynamicForm(contentStore.do.sanitzeContent(content)))
    state.currentPage = pageData
    return state.currentPage
  } catch (error) {
    console.log(error)
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