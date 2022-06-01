<template>
  <div>
    <PageComponentsCookieWall v-if="cookie !== Cookie.Accepted" />
    <RendererPage :path="path" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getUrlPathFromDynamicRoute } from '~~/utils'
import { authStore } from '~~/store/auth'
import { Cookie } from '~~/types/enums'

const cookie = ref()

const path = getUrlPathFromDynamicRoute().last || '',
  tokenId = useCookie<Record<string, any>>('witherLoginToken')

await authStore.do.setTokenState(tokenId.value?.id)

cookie.value = Cookie.Accepted
</script>
<style less>
@import "~~/assets/less/wither/general.less";
</style>