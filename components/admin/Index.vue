<template>
  <NuxtLayout name="admin"></NuxtLayout>
  <div v-if="isLoggedIn">
    <NuxtLink :to="`/${AdminSearch.Admin}`">Go to your dashboard</NuxtLink>
    <NuxtLink :to="`/${AdminSearch.Admin}/${AdminSearch.PageManagement}`">Manage your pages</NuxtLink>
  </div>
  <AdminLogin 
    v-if="!isLoggedIn"/>
  <div v-if="isLoggedIn">
    <div v-if="!search">
      <p>You havent made a home page yet, <NuxtLink :to="`/${AdminSearch.Admin}/${AdminSearch.PageCreation}`">go and make one</NuxtLink></p>
    </div>
    <AdminUserManagement
      v-if="search === AdminSearch.Admin"
      :user="user" />
    <AdminPageManagement 
      v-if="search === AdminSearch.PageManagement"/>
    <AdminPageCreation
      v-if="search === AdminSearch.PageCreation"/>
  </div>
</template>

<script setup lang="ts">
  import { getUrlPath } from '~~/utils'
  import { userStore } from '~~/store/user'
  import { AdminSearch } from '~~/types/enums'

  const isLoggedIn = computed(() => userStore.get.getTokenState())
  const user = ref({})
  const search = getUrlPath().last
  if (isLoggedIn.value) {
    user.value = await userStore.get.getUser()
  }
</script>