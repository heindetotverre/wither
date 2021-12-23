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
  import { useRoute } from 'vue-router'
  import pagesIndex from '~~/server/resources/pagesIndex.json'
  import { findPageBySlug } from '~~/utils'

  const cookie = ref('')
  const isLoggedIn = ref(false)
  const renderer = ref('')

  const urlPath = useRoute().params.slug as Array<string>

  const index = urlPath.length
    ? urlPath.indexOf('')
    : -1

  if (index > 0) {
    urlPath.splice(index)
  }

  const search = [...urlPath].pop()
  const pages = pagesIndex
  
  renderer.value = urlPath[0] === 'admin' || !pages.find(page => page.slug === '/')
    ? 'renderAdmin'
    : 'renderPage'

  const pageBasedOnPath = !urlPath
    ? pages.find(page => page.slug === '/')
    : findPageBySlug(pages, search)[0]

  cookie.value = 'cookieWallAccepted'

</script>