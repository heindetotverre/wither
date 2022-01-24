<template>
  <NuxtLayout name="admin"></NuxtLayout>
  <div v-if="isLoggedIn">
    <NuxtLink to="/admin">Go to your dashboard</NuxtLink>
    <NuxtLink to="/admin/page-management">Manage your pages</NuxtLink>
  </div>
  <AdminLogin 
    v-if="!isLoggedIn"/>
  <div v-if="isLoggedIn ">
    <AdminUserManagement
      v-if="search === 'admin'"
      :user="user" />
    <AdminPageManagement 
      v-if="search === 'page-management'"/>
    <AdminPageCreation
      v-if="search === 'page-creation'"/>
  </div>
</template>

<script setup lang="ts">
  import { getUrlPath } from '~~/utils'
  import { userStore } from '~~/store/user'

  const isLoggedIn = computed(() => userStore.get.getTokenState())
  const user = ref({})
  const search = getUrlPath().last
  if (isLoggedIn.value) {
    user.value = await userStore.get.getUser()
  }
</script>