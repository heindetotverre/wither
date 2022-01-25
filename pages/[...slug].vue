<template>
  <div>
    <CookieWall v-if="cookie !== Cookie.Accepted" />
    <Admin
      v-if="renderer === Render.Admin"/>
    <RendererPage
      v-if="renderer === Render.Page"
      :page="pageBasedOnPath"/>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { findPageBySlug, getUrlPath } from '~~/utils'
  import { pageStore } from '~~/store/pages'
  import { userStore } from '~~/store/user'
  import { Render, Cookie } from '~~/types/enums'

  const cookie = ref()
  const renderer = ref()

  await pageStore.get.fetchPages('hit from ...slug')

  const search = getUrlPath().last
  const pages = pageStore.get.getPages
  const tokenId = useCookie<Record<string, any>>('witherLoginToken')
  const isHomePage = pages.find(page => page.name === 'home')
  
  await userStore.do.setTokenState(tokenId.value?.id)

  renderer.value = getUrlPath().full[0] === 'admin' || !isHomePage
    ? Render.Admin
    : Render.Page

  const pageBasedOnPath = !getUrlPath().full
    ? pages.find(page => page.slug === '/')
    : findPageBySlug(pages, search)[0]

  cookie.value = Cookie.Accepted
</script>