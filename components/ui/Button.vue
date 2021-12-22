<template>
  <div>
    <button @click.prevent="handleClick()">{{ label }}</button>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    label: {
      type: String, 
      default: ''
    }
  })

  const emits = defineEmits([
    'click'
  ])

  const handleClick = () => {
    emits('click')
  }
</script>