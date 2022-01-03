<template>
  <NuxtLayout name="admin"></NuxtLayout>
  <div v-if="isLoggedIn">
    <NuxtLink to="/admin/page-management">Manage your pages</NuxtLink>
  </div>
  <AdminLogin 
    v-if="!isLoggedIn"/>
  <PageManagement 
    v-if="isLoggedIn && search === 'page-management'"/>
  <PageCreation
    v-if="isLoggedIn && search === 'page-creation'"/>
</template>

<script setup lang="ts">
  import { getUrlPath } from '~~/utils'

  const search = getUrlPath().last
  const isLoggedIn = checkForLoggedIn()
</script>