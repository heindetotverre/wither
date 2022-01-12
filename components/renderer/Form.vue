<template>
  <form>
    <component
      v-for="field in formFields"
      :disabled="isDisabled(field)"
      :id="field.id"
      :is="field.component"
      :label="field.label"
      :key="field.key"
      :name="field.key"
      :type="field.type"
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

  const isDisabled = (field) => {
    const state = field.class === 'Button' && validation()
    return state
  }

  const validation = () => {
    const fieldsToValidate = props.formFields.filter(field => field.required)
    const notValidated = []
    for (const singleFieldToValidate of fieldsToValidate) {
      !formValues.value[singleFieldToValidate.key]
        ? notValidated.push(singleFieldToValidate)
        : notValidated.filter(field => field.key !== singleFieldToValidate.key)
    }
    return notValidated.length !== 0
  }

  const submit = () => {
    emits('submit', formValues.value)
    formValues.value = {}
  }
</script>