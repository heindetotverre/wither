<template>
  <div>
    <CookieWall v-if="cookie !== 'cookieWallAccepted'" />
    <AdminView
      v-if="renderer === 'renderAdmin' || (renderer === 'renderPage' && isLoggedIn)"/>
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
  const isLoggedIn = computed(() => store.get.getLoginState())
  const search = getUrlPath().last
  const pages = pagesIndex
  
  renderer.value = getUrlPath().full[0] === 'admin' || !pages.find(page => page.slug === '/')
    ? 'renderAdmin'
    : 'renderPage'

  const pageBasedOnPath = !getUrlPath().full
    ? pages.find(page => page.slug === '/')
    : findPageBySlug(pages, search)[0]

  cookie.value = 'cookieWallAccepted'
</script>