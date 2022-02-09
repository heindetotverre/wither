<template>
  <div>
    <p>Create a page</p>
    <RendererForm :form="createPageForm" :updated-form="updatedForm" @submit="createPage($event)" />
    <NuxtLink :to="`/${AdminSearch.Admin}/${AdminSearch.PageManagement}`">Cancel</NuxtLink>
    <div v-if="response">{{ response }}</div>
  </div>
</template>
<script setup lang="ts">
import formFieldsIndex from '~~/server/resources/formFieldsIndex.json'
import pageComponents from '~~/server/resources/pageComponentIndex.json'
import { adminStore } from '~~/store/admin'
import { createId, flattenObject } from '~~/utils/index'
import { FormField, Page } from '~~/types'
import { AdminSearch } from '~~/types/enums'

const formName = 'createPage',
  pages = adminStore.get.getPages,
  pageNames = () => flattenObject(pages).map(page => page.name),
  componentKeys = () => pageComponents.map(component => component.key),
  response = ref(),
  updatedForm = ref(),
  createPageForm = ref([
    { ...formFieldsIndex.find(field => field.class === 'TextInput'), label: 'name', key: 'name', id: createId(formName) },
    { ...formFieldsIndex.find(field => field.class === 'TextInput'), label: 'slug', key: 'slug', id: createId(formName), validator: 'slug' },
    { ...formFieldsIndex.find(field => field.class === 'SelectInput'), label: 'parent', key: 'parentPage', options: pageNames(), id: createId(formName) },
    { ...formFieldsIndex.find(field => field.class === 'SelectInput'), label: 'components', key: 'pageComponents', options: componentKeys(), id: createId(formName) },
    { ...formFieldsIndex.find(field => field.class === 'Button'), label: 'Save', key: 'savePage', id: createId(formName) }
  ] as Array<FormField>)

onMounted(() => {
  if (!pages.length) {
    updatedForm.value = [{
      name: 'home',
      slug: '/',
      parent: '',
      level: 0,
      author: '',
      components: [],
      meta: {},
      id: ''
    }]
  }
})

const createPage = async (formSubmitEvent: Page) => {
  response.value = await adminStore.do.setPage(formSubmitEvent)
  if (response.value.createPage) {
    useRouter().push(`${AdminSearch.Admin}/${AdminSearch.PageManagement}`)
  }
}

</script>