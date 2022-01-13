<template>
  <label :for="id">{{ label }}</label>
  <input
    :id="id"
    :value="currentValue"
    :type="type"
    :disabled="disabled"
    @input="input($event)"
  />
</template>
<script setup lang="ts">
  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      required: true
    },      
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: 'test'
    },
    modelValue: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  })

  const emits = defineEmits([
    'submit',
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