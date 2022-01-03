<template>
  <label>{{ label }}</label>
  <input
    :value="currentValue"
    @input="input($event)"
  />
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
    },
    id: {
      type: String,
      required: true
    }
  })

  const emits = defineEmits([
    'click',
    'update:modelValue'
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
    emits('update:modelValue', currentValue.value)
  }
</script>