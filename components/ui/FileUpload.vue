<script setup lang="ts">
  import shareableProps from "./shareableProps"
  import shareableEmits from "./shareableEmits"
  import { imageStore } from "~~/store/images";

  const props = defineProps(shareableProps),
    emits = defineEmits(shareableEmits),
    isLoading = ref()

  const input = async (event: Event) => {
    isLoading.value = true

    const fileInputEl = event.target as HTMLInputElement,
      files = fileInputEl.files as FileList,
      form = new FormData

    Array.from(files).forEach(file => {
      form.append(file.name, file)
    })

    const response = await imageStore.do.setImages(form)
    isLoading.value = false
  }
</script>

<template>
  <div :class="[domclass, 'input__wrapper']">
    <slot name="label" />
    <input
      multiple
      accept="image/*"
      :class="`input__el input__el--${type}`"
      :id="id"
      :autocomplete="autocomplete"
      value=""
      :type="type"
      :disabled="disabled"
      @input="input($event)"
    />
    <slot name="error-message" />
    <div v-if="isLoading" class="loader">LOADER!!!!</div>
  </div>
</template>