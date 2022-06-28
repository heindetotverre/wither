<script setup lang="ts">
  import shareableProps from "./shareableProps"
  import shareableEmits from "./shareableEmits"

  const props = defineProps(shareableProps),
    emits = defineEmits(shareableEmits)

  onMounted(() => {
    currentValue.value = props.value
  })

  watch(() => props.value, () => {
    currentValue.value = props.value
  })

  const currentValue = ref()

  const input = (event: Event) => {
    const inputEl = event.target as HTMLInputElement
    currentValue.value = inputEl.value
    emits('input', currentValue.value)
  }
</script>

<template>
  <div :class="[domclass, 'input__wrapper']" v-if="visible">
    <slot name="label" />
    <input
      :id="id"
      :autocomplete="autocomplete"
      :class="`input__el input__el--${type}`"
      :value="currentValue"
      :type="type"
      :disabled="disabled"
      @blur="emits('blur')"
      @focus="emits('focus')"
      @input="input($event)"
    />
    <slot name="error-message" />
  </div>
</template>