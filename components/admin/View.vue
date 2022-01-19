<template>
  <NuxtLayout name="admin"></NuxtLayout>
  <div v-if="isLoggedIn">
    <NuxtLink to="/admin">Go to your dashboard</NuxtLink>
    <NuxtLink to="/admin/page-management">Manage your pages</NuxtLink>
  </div>
  <AdminLogin 
    v-if="!isLoggedIn"/>
  <div v-if="isLoggedIn ">
    <UserManagement
      v-if="search === 'admin'"
      :user="user" />
    <PageManagement 
      v-if="search === 'page-management'"/>
    <PageCreation
      v-if="search === 'page-creation'"/>
  </div>
</template>

<script setup lang="ts">
  import { getUrlPath } from '~~/utils'
  import { userStore } from '~~/store/user'

  const isLoggedIn = computed(() => userStore.get.getTokenState())
  const user = ref({})
  const search = getUrlPath().last

  user.value = await userStore.get.getUser()
</script>