<template>
  <div>
    <NuxtLink :to="`/${AdminSearch.Admin}/${AdminSearch.PageCreation}`">Create Page</NuxtLink>
    <div v-for="(page, index) of pages" :key="index">
      <div v-for="(entry, index) of Object.entries(page)" :key="index">{{ entry }}</div>
      <button @click="deletePage(page.id)">Delete page</button>
    </div>
    <div v-if="!pages.length">You haven't made any pages, please make one</div>
  </div>
  <div v-if="response">{{ response }}</div>
</template>
<script setup lang="ts">
import { adminStore } from '~~/store/admin'
import { AdminSearch } from '~~/types/enums'

const pages = computed(() => adminStore.get.getPages)

const response = ref()

const deletePage = async (pageId: string) => {
  response.value = await adminStore.do.deletePage(pageId)
}
</script>