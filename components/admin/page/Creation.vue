<template>
  <div>
    <p>Create a page</p>
    <RendererForm
      :formName="'createPage'"
      :formFields="createPageForm"
      @submit="createPage($event)"
    />
    <NuxtLink :to="`/${AdminSearch.Admin}/${AdminSearch.PageManagement}`">Cancel</NuxtLink>
    <div v-if="response">{{ response }}</div>
  </div>
</template>
<script setup lang="ts">
import { formStore } from '~~/store/forms'
import { adminStore } from '~~/store/admin'
import { FormField, Page } from '~~/types'
import { AdminSearch } from '~~/types/enums'

const response = ref(),
  createPageForm = ref(formStore.get.getCreatePageForm() as FormField[])

const createPage = async (formSubmitEvent: Page) => {
  response.value = await adminStore.do.setPage(formSubmitEvent)
  if (response.value.createPage) {
    useRouter().push(`${AdminSearch.Admin}/${AdminSearch.PageManagement}`)
  }
}

onBeforeMount(() => {
  parseUrl()
})

const parseUrl = () => {
  const query = useRoute().query
  if (query) {
    formStore.do.setFormValuesBasedOnPage('createPage', query.pageid as string)
  }
}

</script>