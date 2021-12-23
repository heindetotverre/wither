<template>
  <p>Admin section</p>
  <AdminLogin 
    v-if="!isLoggedIn"
    @auth="handleAuth($event)"/>
  <AdminPageManagement 
    v-else/>
  
</template>
<script setup lang="ts">
  const isLoggedIn = ref(false)

  const handleAuth = (event) => {
    isLoggedIn.value = event
  }
</script>