<script setup lang="ts">
  import shareableProps from "./shareableProps"
  import shareableEmits from "./shareableEmits"

  const props = defineProps({...shareableProps, 
      value: {
        type: Boolean,
        required: true
      },
      validation: {
        type: undefined
      }
    }),
    emits = defineEmits(shareableEmits)

  const currentValue = ref()

  onMounted(() => {
    currentValue.value = props.value
  })

  watch(() => props.value, () => {
    currentValue.value = props.value
  })

  const input = () => {
    currentValue.value = !currentValue.value
    emits('input', currentValue.value)
  }
</script>

<template>
  <div :class="domclass" v-if="visible">
    <slot name="label" />
    <input
      :id="id"
      :autocomplete="autocomplete"
      :checked="currentValue"
      :class="`input__el input__el--${type}`"
      :type="type"
      :disabled="disabled"
      @blur="emits('blur')"
      @focus="emits('focus')"
      @input="input()"
    />
    <slot name="error-message" />
  </div>
</template>