<script setup lang="ts">
  import shareableProps from "./shareableProps"
  import shareableEmits from "./shareableEmits"
  import { authStore } from "~~/store/auth";

  const props = defineProps(shareableProps),
    emits = defineEmits(shareableEmits),
    isLoading = ref()

  const input = async (event: Event) => {
    const fileInputEl = event.target as HTMLInputElement,
      files = fileInputEl.files as FileList,
      form = new FormData

    Array.from(files).forEach(file => {
      form.append(file.name, file)
    })

    console.log(form)

    const options = {
      // headers: {
      //   "Authorization": `Bearer ${authStore.get.getTokenId()}`,
      //   "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL"
      // },
      method: 'POST',
      body: form
    }
    isLoading.value = true
    const response = await fetch('/saveimages', options)
    if (response.status === 200) {
      const body = await response.json()
      console.log(body)
    } else {
      console.log('ERROR')
    }
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