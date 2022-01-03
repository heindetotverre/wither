<template>
  <Html :lang="'en-GB'">
    <Head>
      <Title>{{ page.name ? page.name : 'Oops' }}</Title>
      <Meta name="description" :content="`My page's description`" />
    </Head>
  </Html>
  <p>Default page template</p>
  <slot name="404" />
  <slot />
</template>
<script setup lang="ts">
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
</script>