<template>
  <div>
    <p>Create a page</p>
    <RendererForm
      :formName="formStore.state.forms.createPage.formInfo.name"
      :formFields="createPageForm"
      @submit="createPage($event)"
    />
  </div>
  <NuxtLink :to="`/${AdminSearch.Admin}/${AdminSearch.PageManagement}`">Cancel</NuxtLink>
  <div v-if="response">{{ response }}</div>
</template>
<script setup lang="ts">
import { formStore } from '~~/store/forms'
import { adminStore } from '~~/store/admin'
import { Page } from '~~/types'
import { AdminSearch } from '~~/types/enums'

const response = ref(),
  createPageForm = ref(formStore.get.getCreatePageForm().form),
  activeTab = ref()

onBeforeMount(() => {
  parseUrl()
})

const createPage = async (formSubmitEvent: Page) => {
  response.value = await adminStore.do.setPage(formSubmitEvent)
  if (response.value.createPage) {
    useRouter().push(`${AdminSearch.Admin}/${AdminSearch.PageManagement}`)
  }
}

const handleTab = (formName: string) => {
  activeTab.value = formName
}

const parseUrl = () => {
  const query = useRoute().query
  if (query) {
    const page = adminStore.get.getPages().find(p => p.id === query.pageid)
    if (page) {
      formStore.do.setFormValuesBasedOnQuery('createPage', page)
    }
  }
}

</script>