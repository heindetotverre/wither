<template>
  <div>
    <CookieWall v-if="cookie !== 'cookieWallAccepted'" />
    <AdminFactory
      v-if="factory === 'renderAdmin'"/>
    <ComponentFactory
      v-if="factory === 'renderPage'"
      :page="pageBasedOnPath"/>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import pagesIndex from '~~/server/pagesIndex.json'

  import { findPageBySlug } from '~~/utils'

  import AdminFactory from '~~/components/factory/AdminFactory.vue'
  import CookieWall from '~~/components/CookieWall.vue'
  import ComponentFactory from '~~/components/factory/ComponentFactory.vue'

  const factory = ref('')
  const cookie = ref('')

  const urlPath = useRoute().params.slug as Array<string>

  const index = urlPath.length
    ? urlPath.indexOf('')
    : -1
  if (index > 0) {
    urlPath.splice(index)
  }
  const search = [...urlPath].pop()
  const pages = pagesIndex
 
  const pageBasedOnPath = !urlPath
    ? pages.find(page => page.slug === '/')
    : findPageBySlug(pages, search)[0]

  factory.value = urlPath[0] === 'admin' || !pages.find(page => page.slug === '/')
    ? 'renderAdmin'
    : 'renderPage'

  cookie.value = 'cookieWallAccepted'

</script>