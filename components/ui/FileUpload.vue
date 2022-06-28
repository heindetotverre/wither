<script setup lang="ts">
  import shareableProps from "./shareableProps"
  import shareableEmits from "./shareableEmits"

  const props = defineProps(shareableProps),
    emits = defineEmits(shareableEmits)

  const input = (event: Event) => {
  const fileInputEl = event.target as HTMLInputElement,
    files = fileInputEl.files as FileList
  
  Array.from(files).forEach(file => {
    console.log(file)
  })

  }
</script>

<template>
  <div :class="[domclass, 'input__wrapper']">
    <slot name="label" />
    <input
      multiple accept="image/*"
      :class="`input__el input__el--${type}`"
      :id="id"
      :autocomplete="autocomplete"
      value=""
      :type="type"
      :disabled="disabled"
      @input="input($event)"
    />
    <slot name="error-message" />
  </div>
</template>