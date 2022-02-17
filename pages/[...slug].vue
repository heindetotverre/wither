<template>
  <div>
    <CookieWall v-if="cookie !== Cookie.Accepted" />
    <RendererPage :path="path" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getUrlPathFromDynamicRoute } from '~~/utils'
import { authStore } from '~~/store/auth'
import { generalStore } from '~~/store'
import { Cookie } from '~~/types/enums'

const cookie = ref()

const path = getUrlPathFromDynamicRoute().last || '',
  tokenId = useCookie<Record<string, any>>('witherLoginToken')

await generalStore.do.setClient()
await authStore.do.setTokenState(tokenId.value?.id)

cookie.value = Cookie.Accepted
</script>
<style less>
@import "~~/assets/less/general.less";
</style>