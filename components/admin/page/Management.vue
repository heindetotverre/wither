<template>
  <div>
    <NuxtLink :to="`/${AdminSearch.Admin}/${AdminSearch.PageCreation}`">Create Page</NuxtLink>
    <ul>
      <li v-for="(page) of flattenPages" :key="page">
        <p>Page Name: {{ page.name }}</p>
        <p>Page Slug: {{ page.slug }}</p>
        <p>Page MetaData: {{ page.meta }}</p>
        <p>Page Components: {{ page.components }}</p>
        <p>Menu level depth: {{ page.level }}</p>
        <button @click="deletePage(page.id)">Delete page</button>
      </li>
    </ul>
    <div v-if="!flattenPages.length">You haven't made any pages, please make one</div>
  </div>
  <div v-if="response">{{ response }}</div>
</template>
<script setup lang="ts">
import { flattenObject } from '~~/utils/index'
import { adminStore } from '~~/store/admin'
import { AdminSearch } from '~~/types/enums'

const pages = computed(() => adminStore.get.getPages)

watch(() => pages.value, () => {
  flattenPages.value = flattenObject(pages.value)
})

const flattenPages = ref(flattenObject(pages.value))
const response = ref()

const deletePage = async (pageId: string) => {
  response.value = await adminStore.do.deletePage(pageId)
}
</script>