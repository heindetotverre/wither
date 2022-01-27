<template>
  <div>
    <NuxtLink :to="!urlPath.includes('admin')
      ? '/admin'
      : '/'">{{ !urlPath.includes('admin')
        ? 'Go to to admin'
        : 'Go to website' }}
    </NuxtLink>
    <button @click="logout()">Log out</button>
  </div>
</template>
<script setup data-lang="ts">
  import { userStore } from '~~/store/user'

  const logout = async () => {
    await userStore.do.logout()
    useRouter().push('/')
  }

  const urlPath = useRoute().params.slug
</script>