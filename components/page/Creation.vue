<template>
  <div>
    <p>Create a page</p>
    <RendererForm
      :formFields="createPageForm"
      @submit="createPage($event)"/>
    <NuxtLink to="/admin/page-management">Cancel</NuxtLink>
  </div>
</template>
<script setup lang="ts">
  import formFieldsIndex from '~~/server/resources/formFieldsIndex.json'
  import { createId } from '~~/utils/index'

  const createPageForm = ref([
    {
      ...formFieldsIndex.find(field => field.type === 'TextInput'),
      label: 'title',
      key: 'Title',
      id: createId('createPage')
    },
    {
      ...formFieldsIndex.find(field => field.type === 'TextInput'),
      label: 'url',
      key: 'Url',
      id: createId('createPage')
    },
    {
      ...formFieldsIndex.find(field => field.type === 'SelectInput'),
      label: 'parent',
      key: 'ParentPage',
      id: createId('createPage')
    },
    {
      ...formFieldsIndex.find(field => field.type === 'Button'),
      label: 'Save',
      key: 'SavePage',
      id: createId('createPage')
    }
  ])

  const createPage = (formSubmitEvent) => {

  }

</script>