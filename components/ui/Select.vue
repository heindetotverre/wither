<template>
  
</template>
<script setup lang="ts">
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    }
  })
</script>