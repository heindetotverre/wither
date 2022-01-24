<template>
  <div>
    <p>Create a page</p>
    <RendererForm
      :form="createPageForm"
      @submit="createPage($event)"/>
    <NuxtLink to="/admin/page-management">Cancel</NuxtLink>
  </div>
</template>
<script setup lang="ts">
  import formFieldsIndex from '~~/server/resources/formFieldsIndex.json'
  import pagesIndex from '~~/server/resources/pagesIndex.json'
  import pageComponents from '~~/server/resources/pageComponentIndex.json'
  import { createId, flattenObject } from '~~/utils/index'
  import { FormField } from '~~/types'

  const formName = 'createPage'
  const pageNames = () => flattenObject(pagesIndex).map(page => page.name)
  const componentKeys = () => pageComponents.map(component => component.key)

  const createPageForm = ref([
    { ...formFieldsIndex.find(field => field.class === 'TextInput'), label: 'name', key: 'Name', id: createId(formName)},
    { ...formFieldsIndex.find(field => field.class === 'TextInput'), label: 'slug', key: 'Slug', id: createId(formName), validator: 'slug'},
    { ...formFieldsIndex.find(field => field.class === 'SelectInput'), label: 'parent', key: 'ParentPage', options: pageNames(), id: createId(formName)},
    { ...formFieldsIndex.find(field => field.class === 'SelectInput'), label: 'components', key: 'PageComponents', options: componentKeys(), id: createId(formName)},
    { ...formFieldsIndex.find(field => field.class === 'Button'), label: 'Save', key: 'SavePage', id: createId(formName)}
  ] as Array<FormField>)

  const createPage = (formSubmitEvent) => {

  }

</script>