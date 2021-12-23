<template>
  <form>
    <component
      v-for="field in formFields"
      :is="field.component"
      :label="field.label"
      :key="field.key"
      :name="field.key"
      v-model="formValues[field.key]"
      @click="submit()">
      <slot></slot>
    </component>
  </form>
</template>
<script setup lang="ts">
  import { PropType } from 'vue'

  const props = defineProps({
    formFields: {
      type: Array as PropType<Array<any>>,
      required: true
    }
  })

  const emits = defineEmits([
    'inputField',
    'submit'
  ])

  const formValues = ref<Record<string, any>>({})

  const submit = () => {
    emits('submit', formValues.value)
    formValues.value = {}
  }
</script>