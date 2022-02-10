<template>
  <div>
    <button @click.prevent="handleClick()" :disabled="disabled">{{ label }}</button>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  domclass: {
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