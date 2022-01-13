<template>
  <Html :lang="'en-GB'">
    <Head>
      <Title>{{ page.name ? page.name : 'Oops' }}</Title>
      <Meta name="description" :content="`My page's description`" />
    </Head>
  </Html>

  <AdminBar 
    v-if="isLoggedIn"/>

  <slot name="404" />
  <slot />
</template>
<script setup lang="ts">
  import { store } from '~~/store'

  const props = defineProps({
    name: {
      type: String,
      default: ''
    },
    page: {
      type: Object,
      default: {}
    }
  })

  const isLoggedIn = computed(() => store.get.getTokenState())
</script>