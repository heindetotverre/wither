<template>
  <div>
    <p>{{ content.text }}</p>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const emits = defineEmits([
  'setFields'
])

emits('setFields', [
  {
    name: 'text',
    type: 'text',
    label: 'Enter the text',
    default: 'This is a text'
  }
])
</script>