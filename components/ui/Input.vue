<template>
  <label>{{ label }}</label>
  <input
    :value="currentValue"
    @input="input($event)"
  />
</template>
<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'

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

  const emits = defineEmits([
    'click',
    'input'
  ])

  const currentValue = ref<String>('')

  onMounted (() => {
    currentValue.value = props.modelValue
  })

  watch(() => props.modelValue, () => {
    currentValue.value = props.modelValue
  })

  const input = (event : Event) => {
    const inputEl = event.target as HTMLInputElement
    currentValue.value = inputEl.value
    emits('input', { key: props.name, value: currentValue.value })
  }
</script>