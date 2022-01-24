<template>
  <label :for="id">{{ label }}</label>
  <input
    :id="id"
    :autocomplete="autocomplete"
    :value="currentValue"
    :type="type"
    :disabled="disabled"
  />
  <span 
    v-for="(option, index) of options"
    :key="index">{{ option }}, </span>
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
    autocomplete: {
      type: String
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
    },
    options: {
      type: Array, 
      default: []
    }
  })

  const currentValue = ref<String>('')
</script>