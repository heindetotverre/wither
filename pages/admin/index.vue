<script setup lang="ts">
  import { adminStore } from '~~/store/admin'
  import { authStore } from '~~/store/auth'

  definePageMeta({
    layout: 'admin'
  })

  const tokenId = useCookie<Record<string, any>>('witherLoginToken'),
    user = computed(() => adminStore.get.getUser())

  await authStore.do.setTokenState(tokenId.value?.id)
</script>

<template>
  <div>Hi {{ user.firstName }}, welcome to the Wither CMS backend</div>
</template>