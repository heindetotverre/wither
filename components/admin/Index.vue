<template>
  <NuxtLayout name="admin"></NuxtLayout>
  <AdminLogin v-if="!isLoggedIn" />
  <div v-else>
    <NuxtLink :to="`/${AdminPath.Admin}`">Go to your dashboard</NuxtLink>
    <NuxtLink :to="`/${AdminPath.Admin}/${AdminPath.PageManagement}`">Manage your pages</NuxtLink>
    <div v-if="!search">
      <p>
        You havent made a home page yet,
        <NuxtLink :to="`/${AdminPath.Admin}/${AdminPath.PageCreation}`">go and make one</NuxtLink>
      </p>
    </div>
    <AdminUserManagement v-if="search === AdminPath.Admin" />
    <AdminUserEdit v-if="search === AdminPath.UserEdit" />
    <AdminPageManagement v-if="search === AdminPath.PageManagement" />
    <AdminPageCreation v-if="search === AdminPath.PageCreation" />
  </div>
</template>

<script setup lang="ts">
import { adminStore } from '~~/store/admin'
import { authStore } from '~~/store/auth'
import { AdminPath } from '~~/types/enums'

const props = defineProps({
  search: {
    type: String,
    required: true
  }
})

const isLoggedIn = computed(() => authStore.get.getTokenState())

if (isLoggedIn.value) {
  await adminStore.get.fetchAdmin()
}
</script>