<template>
  <p>Default admin template</p>
  <Html :lang="'en-GB'">
    <Head>
      <Title>Admin</Title>
      <Meta name="description" :content="`My page's description`" />
    </Head>
  </Html>
  <slot />
</template>
<script setup lang="ts">
  const props = defineProps({
    name: {
      type: String,
      default: ''
    }
  })
</script>