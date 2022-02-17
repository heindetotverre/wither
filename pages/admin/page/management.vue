<template>
  <div>
    <div>
      <NuxtLink :to="`/${AdminPath.Admin}/${AdminPath.Pages}/${AdminPath.Create}`">Create Page</NuxtLink>
      <div v-for="(page) of pages" :key="page.name">
        <div v-for="(entry, index) of Object.entries(page)" :key="index">{{ entry }}</div>
        <button @click="deletePage(page.id)">Delete page</button>
        <button @click="editPage(page.id)">Edit page</button>
      </div>
      <div v-if="!pages.length">You haven't made any pages, please make one</div>
    </div>
    <div v-if="response">{{ response }}</div>
  </div>
</template>
<script setup lang="ts">
import { adminStore } from '~~/store/admin'
import { AdminPath } from '~~/types/enums'

definePageMeta({
  layout: 'admin'
})

const pages = computed(() => adminStore.get.getPages()),
  response = ref()

const deletePage = async (pageId: string) => {
  response.value = await adminStore.do.deletePage(pageId)
}

const editPage = (pageId: string) => {
  useRouter().push(`/${AdminPath.Admin}/${AdminPath.Pages}/${AdminPath.Create}?pageid=${pageId}`)
}
</script>