<template>
  <Html :lang="'en-GB'">
    <Head>
      <Title>Admin</Title>
      <Meta name="description" :content="`Admin section`" />
    </Head>
  </Html>

  <AdminBar 
    v-if="isLoggedIn"/>

  <slot />
</template>
<script setup lang="ts">
  import { userStore } from '~~/store/user'
  
  const props = defineProps({
    name: {
      type: String,
      default: ''
    }
  })

  const isLoggedIn = computed(() => userStore.get.getTokenState())
</script>