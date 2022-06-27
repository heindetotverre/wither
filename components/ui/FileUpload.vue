<script setup lang="ts">
  import shareableProps from "./shareableProps"
  import shareableEmits from "./shareableEmits"

  const props = defineProps(shareableProps),
    emits = defineEmits(shareableEmits)

  onMounted(() => {

  })

  watch(() => props.value, () => {

  })

  const currentValue = ref()

  const input = (event: Event) => {

  }
</script>

<template>
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
</template>