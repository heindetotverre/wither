<template>
  <div>
    <NuxtLink :to="!urlPath.includes('admin')
    ? '/admin'
    : '/'">
      {{
        !urlPath.includes('admin')
          ? 'Go to to admin'
          : 'Go to website'
      }}
    </NuxtLink>
    <button @click="logout()">Log out</button>
  </div>
</template>
<script setup data-lang="ts">
import { authStore } from '~~/store/auth'

const logout = async () => {
  await authStore.do.logout()
}

const urlPath = useRoute().params.slug
</script>