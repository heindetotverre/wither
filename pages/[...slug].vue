<script setup lang="ts">
  import { ref } from 'vue'
  import { getUrlPathFromDynamicRoute } from '~~/utils'
  import { authStore } from '~~/store/auth'
  import { Cookie } from '~~/types/enums'
  import LazyRendererPage from "~~/components/renderer/Page.vue"

  const cookie = ref()

  const path = getUrlPathFromDynamicRoute().last || '',
    tokenId = useCookie<Record<string, any>>('witherLoginToken')

  await authStore.do.setTokenState(tokenId.value?.id)

  cookie.value = Cookie.Accepted
  </script>

<template>
  <LazyRendererPage :path="path" />
</template>