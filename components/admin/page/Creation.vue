<template>
  <div>
    <p>Create a page</p>
    <RendererMultiForm
      :form="createPageForm"
      @inputField="onInput($event)"
      @submit="createPage($event)"
    />
  </div>
  <NuxtLink :to="`/${AdminPath.Admin}/${AdminPath.PageManagement}`">Cancel</NuxtLink>
  <div v-if="response">{{ response }}</div>
</template>
<script setup lang="ts">
import { formStore } from '~~/store/forms'
import { adminStore } from '~~/store/admin'
import { FormEvent, Page } from '~~/types'
import { AdminPath } from '~~/types/enums'

const response = ref(),
  createPageForm = ref(formStore.get.getCreatePageForm())

onBeforeMount(() => {
  parseUrl()
})

const createPage = async (formSubmitEvent: Page) => {
  response.value = await adminStore.do.setPage(formSubmitEvent)
  if (response.value?.createPage) {
    useRouter().push(`${AdminPath.Admin}/${AdminPath.PageManagement}`)
  }
}

const onInput = (event: FormEvent) => {
  if (event.key === 'isInMenu') {
    formStore.do.updateSpecificFormValues({ name: createPageForm.value.formInfo.name, key: 'order', property: 'visible', value: event.value })
    formStore.do.updateSpecificFormValues({ name: createPageForm.value.formInfo.name, key: 'parentPage', property: 'visible', value: event.value })
  }
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