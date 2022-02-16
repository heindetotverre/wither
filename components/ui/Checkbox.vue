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
      @input="input($event)"
    />
    <slot />
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
  type: {
    type: String,
    default: 'text'
  },
  options: {
    type: Array,
    default: []
  },
  value: {
    type: [String, Boolean],
    default: false
  },
  domclass: {
    type: String,
    default: ''
  },
  validation: {
    type: Object
  }
})

const emits = defineEmits([
  'blur',
  'focus',
  'submit',
  'input'
])

const currentValue = ref()

onMounted(() => {
  currentValue.value = props.value
})

watch(() => props.value, () => {
  currentValue.value = props.value
})

const input = (event: Event) => {
  const inputEl = event.target as HTMLInputElement
  currentValue.value = inputEl.value
  emits('input', currentValue.value)
}
</script>