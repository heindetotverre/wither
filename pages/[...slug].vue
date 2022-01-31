<template>
  <div>
    <CookieWall v-if="cookie !== Cookie.Accepted" />
    <Admin v-if="renderer === Render.Admin" :search="search" />
    <RendererPage v-if="renderer === Render.Page" :search="search" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getUrlPath } from '~~/utils'
import { userStore } from '~~/store/user'
import { Render, Cookie } from '~~/types/enums'

const cookie = ref()
const renderer = ref()

const search = !getUrlPath().last
  ? ''
  : getUrlPath().last as string
const tokenId = useCookie<Record<string, any>>('witherLoginToken')

await userStore.do.setTokenState(tokenId.value?.id)

renderer.value = getUrlPath().first === 'admin'
  ? Render.Admin
  : Render.Page

cookie.value = Cookie.Accepted
</script>