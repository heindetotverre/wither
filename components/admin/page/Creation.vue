<template>
  <div>
    <p>Create a page</p>
    <RendererForm
      :form="createPageForm"
      :updated-form="updatedForm"
      @submit="createPage($event)"/>
    <NuxtLink :to="`/${AdminSearch.Admin}/${AdminSearch.PageManagement}`">Cancel</NuxtLink>
    <div v-if="response">{{ response }}</div>
  </div>
</template>
<script setup lang="ts">
  import formFieldsIndex from '~~/server/resources/formFieldsIndex.json'
  import pageComponents from '~~/server/resources/pageComponentIndex.json'
  import { pageStore } from '~~/store/pages'
  import { createId, flattenObject } from '~~/utils/index'
  import { FormField } from '~~/types'
  import { AdminSearch } from '~~/types/enums'

  const formName = 'createPage'
  const pages = pageStore.get.getPages
  const pageNames = () => flattenObject(pages).map(page => page.name)
  const componentKeys = () => pageComponents.map(component => component.key)

  const response = ref()
  const updatedForm = ref([])
  const createPageForm = ref([
    { ...formFieldsIndex.find(field => field.class === 'TextInput'), label: 'name', key: 'Name', id: createId(formName)},
    { ...formFieldsIndex.find(field => field.class === 'TextInput'), label: 'slug', key: 'Slug', id: createId(formName), validator: 'slug'},
    { ...formFieldsIndex.find(field => field.class === 'SelectInput'), label: 'parent', key: 'ParentPage', options: pageNames(), id: createId(formName)},
    { ...formFieldsIndex.find(field => field.class === 'SelectInput'), label: 'components', key: 'PageComponents', options: componentKeys(), id: createId(formName)},
    { ...formFieldsIndex.find(field => field.class === 'Button'), label: 'Save', key: 'SavePage', id: createId(formName)}
  ] as Array<FormField>)

  onMounted(() => {
    if (!pages.length) {
      updatedForm.value = [{ Name: 'home' },{ Slug: '/' }]
    }
  })

  const createPage = async (formSubmitEvent) => {
    response.value = await pageStore.do.setPage(formSubmitEvent)
    if (response.value.data.message) {
      useRouter().push(`${AdminSearch.Admin}/${AdminSearch.PageManagement}`)
    }
  }

</script>