<script setup lang="ts">
  import { adminStore } from '~~/store/admin'

  definePageMeta({
    layout: 'admin'
  })

  const user = computed(() => adminStore.get.getUser())
</script>

<template>
  <div>Hi {{ user.firstName }}, welcome to the Wither CMS backend</div>
</template>