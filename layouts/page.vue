<script setup lang="ts">
  import { authStore } from '~~/store/auth'

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

  const isLoggedIn = computed(() => authStore.get.getTokenState())
</script>

<template>
  <div>
    <Html :lang="'en-GB'">
      <Head>
        <Title>{{ page ? page.name : 'Oops' }}</Title>
        <Meta name="description" :content="`My page's description`" />
      </Head>
    </Html>

    <AdminBar v-if="isLoggedIn" />

    <slot name="404" />
    <slot />
  </div>
</template>