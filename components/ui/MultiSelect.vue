<template>
  <div :class="domclass" v-if="visible" ref="multiSelect">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :autocomplete="autocomplete"
      :value="currentValue"
      :type="type"
      :disabled="disabled"
      @focus="onFocus()"
    />
    <ul v-if="hasFocus">
      <li v-for="(option, index) of options" :key="index">
        <UiCheckbox
          :id="`multiselect_${id}_${index}`"
          :name="`multiselect_${name}`"
          :value="checkForValue(option as string)"
          type="checkbox"
          :label="(option as string)"
          @input="selectOption(option as string)"
        />
      </li>
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
    type: Array,
    default: []
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
  currentValue.value = props.value.join(',')
})

watch(() => props.value, () => {
  currentValue.value = props.value.join('')
})

const currentValue = ref(),
  hasFocus = ref(false),
  multiSelect = ref()

let values: string[] = []

const checkForValue = (option: string) => {
  return !!values.includes(option)
}

const handleClickOutside = (event: Event) => {
  if (multiSelect.value && !multiSelect.value.contains(event.target)) {
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

const selectOption = (option: string) => {
  values.includes(option)
    ? values = values.filter(v => v !== option)
    : values.push(option)

  currentValue.value = values.join(', ')
  emits('input', values)
}
</script>