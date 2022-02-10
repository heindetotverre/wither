<template>
  <div :class="domclass">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :autocomplete="autocomplete"
      :value="currentValue"
      :type="type"
      :disabled="disabled"
      @blur="emits('blur')"
      @focus="emits('focus')"
    />
    <span v-for="(option, index) of options" :key="index">{{ option }},</span>
  </div>
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
  },
  value: {
    type: String,
    default: ''
  },
  domclass: {
    type: String,
    default: ''
  }
})

const emits = defineEmits([
  'blur',
  'focus',
  'submit',
  'input'
])

const currentValue = ref<String>('')
</script>