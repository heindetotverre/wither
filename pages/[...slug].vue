<template>
  <div>
    <CookieWall v-if="cookie !== 'cookieWallAccepted'" />
    <AdminView
      v-if="renderer === 'renderAdmin'"/>
    <RendererPage
      v-if="renderer === 'renderPage'"
      :page="pageBasedOnPath"/>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import pagesIndex from '~~/server/resources/pagesIndex.json'
  import { findPageBySlug, getUrlPath } from '~~/utils'
  import { store } from '~~/store'

  const cookie = ref('')
  const renderer = ref('')
  const search = getUrlPath().last
  const pages = pagesIndex
  const hasToken = useCookie<string>('witherLoginToken')
  await store.do.setTokenState(hasToken.value)

  renderer.value = getUrlPath().full[0] === 'admin' || !pages.find(page => page.name === 'home')
    ? 'renderAdmin'
    : 'renderPage'

  const pageBasedOnPath = !getUrlPath().full
    ? pages.find(page => page.slug === '/')
    : findPageBySlug(pages, search)[0]

  cookie.value = 'cookieWallAccepted'
</script>