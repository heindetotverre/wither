<template>
  <div>
    <NuxtLink to="/admin">Go to admin dashboard</NuxtLink>
    <button @click="logout()">Log out</button>
  </div>
</template>
<script setup data-lang="ts">
  import { userStore } from '~~/store/user'

  const logout = async () => {
    await userStore.do.logout()
    useRouter().push('/')
  }
</script>