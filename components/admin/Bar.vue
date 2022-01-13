<template>
  <div>
    <NuxtLink to="/admin">Go to admin dashboard</NuxtLink>
    <button @click="logout()">Log out</button>
  </div>
</template>
<script setup data-lang="ts">
  import { store } from '~~/store'

  const logout = async () => {
    await store.do.logout()
    useRouter().push('/')
  }
</script>