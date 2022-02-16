<template>
  <div :class="domclass" v-if="visible" ref="select">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :autocomplete="autocomplete"
      :value="currentValue"
      :type="type"
      :disabled="disabled"
      @focus="onFocus()"
      @input="onInput()"
    />

    <ul v-if="hasFocus">
      <span @click="selectOption('clear')">clear</span>
      <li
        v-for="(option, index) of options"
        :key="index"
        @click="selectOption(option as string)"
      >{{ option }}</li>
    </ul>
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
    type: [String, Number],
    default: ''
  },
  domclass: {
    type: String,
    default: ''
  },
  visible: {
    type: Boolean,
    default: true
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

onMounted(() => {
  currentValue.value = props.value
})

watch(() => props.value, () => {
  currentValue.value = props.value
})

const currentValue = ref(),
  hasFocus = ref(false),
  select = ref()

const handleClickOutside = (event: Event) => {
  if (select.value && !select.value.contains(event.target)) {
    document.body.removeEventListener('click', handleClickOutside)
    hasFocus.value = false
    emits('blur')
  }
}

const onFocus = () => {
  document.body.addEventListener('click', handleClickOutside)
  hasFocus.value = true
  emits('focus')
}

const onInput = () => {

}

const selectOption = (option: string) => {
  currentValue.value = option === 'clear'
    ? ''
    : option
  emits('input', currentValue.value)
  hasFocus.value = false
}
</script>