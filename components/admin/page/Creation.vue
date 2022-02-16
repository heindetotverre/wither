<template>
  <div>
    <p>{{ Object.keys(query).length ? 'Edit page' : 'Create page' }}</p>
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
  createPageForm = ref(formStore.get.getCreatePageForm()),
  formName = createPageForm.value.formInfo.name,
  query = useRoute().query

onBeforeMount(() => {
  parseUrl()
})

onMounted(() => {
  checkValuesAndSetForm()
})

const checkValuesAndSetForm = () => {
  const fieldsToUpdate = createPageForm.value.fields.filter(f => f.key === 'isInMenu' || f.key === 'pageMenuParent')
  fieldsToUpdate.forEach(field => {
    onInput({ name: formName, key: field.key, property: 'value', value: field.value })
  })
}

const createPage = async (formSubmitEvent: Page) => {
  response.value = await adminStore.do.setPage(formSubmitEvent)
  if (response.value?.createPage) {
    useRouter().push(`${AdminPath.Admin}/${AdminPath.PageManagement}`)
  }
}

const onInput = (event: FormEvent) => {
  if (event.key === 'isInMenu') {
    formStore.do.updateSpecificFormValues({ name: formName, key: 'pageMenuParent', property: 'visible', value: event.value })
  }
  if (event.key === 'pageMenuParent' && event.value !== '') {
    formStore.do.updateSpecificFormValues({ name: formName, key: 'pageMenuOrder', property: 'visible', value: true })
  }
  if (event.key === 'isInMenu' && !event.value) {
    formStore.do.updateSpecificFormValues({ name: formName, key: 'pageMenuOrder', property: 'visible', value: event.value })
    formStore.do.updateSpecificFormValues({ name: formName, key: 'pageMenuParent', property: 'visible', value: event.value })
    formStore.do.updateSpecificFormValues({ name: formName, key: 'pageMenuOrder', property: 'value', value: '' })
    formStore.do.updateSpecificFormValues({ name: formName, key: 'pageMenuParent', property: 'value', value: '' })
  }
}

const parseUrl = () => {
  if (Object.keys(query).length) {
    const page = adminStore.get.getPages().find(p => p.id === query.pageid)
    if (page) {
      formStore.do.setFormValuesBasedOnQuery('createPage', page)
    }
  } else {
    createPageForm.value = formStore.get.getCreatePageForm()
  }
}

</script>