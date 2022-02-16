<template>
  <div :class="domclass" v-if="visible">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :autocomplete="autocomplete"
      :value="currentValue"
      :type="type"
      :disabled="disabled"
      @blur="onBlur()"
      @focus="onFocus()"
    />
    <div v-if="hasFocus">
      <div v-for="(option, index) of options" :key="index">| {{ option }} |</div>
    </div>
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
  hasFocus = ref(false)

const onBlur = () => {
  hasFocus.value = false
  emits('blur')
}

const onFocus = () => {
  hasFocus.value = true
  emits('focus')
}
</script>