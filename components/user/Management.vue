<template>
  {{ user }}
</template>
<script setup lang="ts">
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })

  onMounted(() => {
    
  })
</script>