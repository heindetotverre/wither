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
  <div :class="['form__field', `form__field--${type}`]">
    <div :class="[domclass, 'input__wrapper']" v-if="visible">
      <label class="input__label" :for="id">{{ label }}</label>
      <input
        class="input__el"
        :id="id"
        :autocomplete="autocomplete"
        :value="currentValue"
        :type="type"
        :disabled="disabled"
        @blur="emits('blur')"
        @focus="emits('focus')"
        @input="input($event)"
      />
      <slot name="error-message" />
    </div>
  </div>
</template>