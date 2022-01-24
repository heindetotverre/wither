<template>
  <form>
    <component
      v-for="field in formFields"
      :is="field.component"
      :autocomplete="field.autocomplete"
      :disabled="isDisabled(field)"
      :id="field.id"
      :label="field.label"
      :key="field.key"
      :name="field.key"
      :type="field.type"
      :options="field.options"
      v-model="formValues[field.key]">
      <slot></slot>
    </component>
    <component
      v-for="button in buttons"
      :is="button.component"
      :disabled="isDisabled(button)"
      :label="button.label"
      @click="submit()"
    ></component>
  </form>
</template>
<script setup lang="ts">
  import { PropType, watch } from 'vue'
  import validators from '~~/utils/validators'

  const props = defineProps({
    form: {
      type: Array as PropType<Array<any>>,
      required: true
    },
    updatedForm: {
      type: Array as PropType<Array<any>>
    }
  })

  const formFields = props.form.filter(f => f.class !== 'Button')
  const buttons = props.form.filter(f => f.class === 'Button')

  const emits = defineEmits([
    'inputField',
    'submit'
  ])

  watch(() => props.updatedForm, () => {
    console.log('update form')
    formValues.value = props.updatedForm
  })

  const formValues = ref<Record<string, any>>({})

  const isDisabled = (field) => {
    return field.disabled
      ? field.disabled
      : field.class === 'Button' && validation()
  }

  const validation = () => {
    const fieldsToValidate = props.form.filter(field => field.validator)
    const notValidated = []
    for (const singleFieldToValidate of fieldsToValidate) {
      const fieldKey = singleFieldToValidate.key
      const fieldValidator = validators[singleFieldToValidate.validator]
      const fieldValue = formValues.value[fieldKey]
      if (fieldValidator) {
        !fieldValidator(fieldValue)
          ? notValidated.push(singleFieldToValidate)
          : notValidated.filter(field => field.key !== fieldKey)
      }
    }
    return notValidated.length !== 0
  }

  const submit = () => {
    emits('submit', formValues.value)
    formValues.value = {}
  }
</script>