<template>
  <div>
    <p>Create a page</p>
    <RendererForm :form="createPageForm" :updated-form="updatedForm" @submit="createPage($event)" />
    <NuxtLink :to="`/${AdminSearch.Admin}/${AdminSearch.PageManagement}`">Cancel</NuxtLink>
    <div v-if="response">{{ response }}</div>
  </div>
</template>
<script setup lang="ts">
import { formStore } from '~~/store/forms'
import { adminStore } from '~~/store/admin'
import { FormField, Page } from '~~/types'
import { AdminSearch } from '~~/types/enums'

const pages = adminStore.get.getPages,
  response = ref(),
  updatedForm = ref(),
  createPageForm = ref(formStore.state.forms.createPage as Array<FormField>)

onMounted(() => {
  if (!pages.length) {
    formStore.do.setFormForHomePage()
  }
})

const createPage = async (formSubmitEvent: Page) => {
  response.value = await adminStore.do.setPage(formSubmitEvent)
  if (response.value.createPage) {
    useRouter().push(`${AdminSearch.Admin}/${AdminSearch.PageManagement}`)
  }
}

</script>