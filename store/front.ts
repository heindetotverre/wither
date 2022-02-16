import { reactive, readonly, } from "vue"
import { Page } from '~~/types'
import { useQuery } from "@urql/vue"

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
       }`
    }))
    const pageData = (data.value.data as any).getSinglePage
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