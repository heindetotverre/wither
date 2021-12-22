<template>
  <div>
    <p>Page with components</p>
    <p>{{ page ? page : '404' }}</p>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    page: {
      type: Object,
      required: false
    }
  })
</script>