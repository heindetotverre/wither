<template>
  <p>Page with components</p>
  <p>{{ page ? page : '404' }}</p>
</template>
<script setup lang="ts">
  const props = defineProps({
    page: {
      type: Object,
      required: true
    }
  })
</script>