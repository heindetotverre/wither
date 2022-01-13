<template>
  <Html :lang="'en-GB'">
    <Head>
      <Title>Admin</Title>
      <Meta name="description" :content="`My page's description`" />
    </Head>
  </Html>

  <AdminBar 
    v-if="isLoggedIn"/>

  <slot />
</template>
<script setup lang="ts">
  import { store } from '~~/store'
  
  const props = defineProps({
    name: {
      type: String,
      default: ''
    }
  })

  const isLoggedIn = computed(() => store.get.getTokenState())
</script>