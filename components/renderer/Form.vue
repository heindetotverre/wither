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
      :validators="mappedValidators(field.validator)"
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
  import { PropType } from 'vue'
  import validators from '~~/utils/validators'

  const props = defineProps({
    form: {
      type: Array as PropType<Array<any>>,
      required: true
    }
  })

  const formFields = props.form.filter(f => f.class !== 'Button')
  const buttons = props.form.filter(f => f.class === 'Button')

  const emits = defineEmits([
    'inputField',
    'submit'
  ])

  const formValues = ref<Record<string, any>>({})

  const isDisabled = (field) => {
    return field.class === 'Button' && validation()
  }

  const mappedValidators = (validator) => {
    return validators[validator]
  }

  const validation = () => {
    const fieldsToValidate = props.form.filter(field => field.required)
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