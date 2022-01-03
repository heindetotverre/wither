<template>
  <p>Admin section</p>
  <AdminLogin 
    v-if="!isLoggedIn"
    @auth="handleAuth($event)"/>
  <PageManagement 
    v-if="isLoggedIn && search === 'page-management'"/>
  <PageCreation
    v-if="isLoggedIn && search === 'page-creation'"/>
</template>
<script setup lang="ts">
  import { getUrlPath } from '~~/utils'

  const search = getUrlPath().last
  const isLoggedIn = ref(false)

  const handleAuth = (event) => {
    isLoggedIn.value = event
  }
</script>