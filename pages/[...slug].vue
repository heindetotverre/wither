<script setup lang="ts">
  import { getUrlPathFromDynamicRoute } from '~~/utils'
  import LazyRendererPage from "~~/components/renderer/Page.vue"

  const path = getUrlPathFromDynamicRoute().last || ''
  </script>

<template>
  <LazyRendererPage :path="path" />
</template>