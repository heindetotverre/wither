<script setup lang="ts">
  import { getUrlPathFromDynamicRoute } from '~~/utils'
  import LazyRendererPage from "~~/components/renderer/Page.vue"

  const path = getUrlPathFromDynamicRoute().last || ''
  </script>

<template>
  <div>
    <LazyRendererPage :path="path" />
  </div>
</template>