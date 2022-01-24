<template>
  <div>
    <CookieWall v-if="cookie !== 'cookieWallAccepted'" />
    <Admin
      v-if="renderer === 'renderAdmin'"/>
    <RendererPage
      v-if="renderer === 'renderPage'"
      :page="pageBasedOnPath"/>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { findPageBySlug, getUrlPath } from '~~/utils'
  import { pageStore } from '~~/store/pages'
  import { userStore } from '~~/store/user'

  const cookie = ref('')
  const renderer = ref('')
  const search = getUrlPath().last
  const pages = await pageStore.get.getPages()
  const tokenId = useCookie<Record<string, any>>('witherLoginToken')
  const isHomePage = pages.find(page => page.name === 'home')
  
  await userStore.do.setTokenState(tokenId.value?.id)
  renderer.value = getUrlPath().full[0] === 'admin' || !isHomePage
    ? 'renderAdmin'
    : 'renderPage'

  const pageBasedOnPath = !getUrlPath().full
    ? pages.find(page => page.slug === '/')
    : findPageBySlug(pages, search)[0]

  cookie.value = 'cookieWallAccepted'
</script>