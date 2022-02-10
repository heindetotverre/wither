<template>
  <Html :lang="'en-GB'">
    <Head>
      <Title>Admin</Title>
      <Meta name="description" :content="`Admin section`" />
    </Head>
  </Html>

  <AdminBar v-if="isLoggedIn" />

  <slot />
</template>
<script setup lang="ts">
import { authStore } from '~~/store/auth'

const props = defineProps({
  name: {
    type: String,
    default: ''
  }
})

const isLoggedIn = computed(() => authStore.get.getTokenState())
</script>
<style lang="less">
@import "~~/assets/less/admin.less";
</style>