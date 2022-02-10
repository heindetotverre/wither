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
      :value="field.value"
      @input="setFormValues({ name: formName, key: field.key, property: 'value', value: $event })"
    >
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
import { formStore } from '~~/store/forms'
import validators from '~~/utils/validators'
import { Forms, FormEvent, FormField } from '~~/types'

const props = defineProps({
  formName: {
    type: String as PropType<keyof Forms>,
    required: true
  },
  formFields: {
    type: Array as PropType<Array<FormField>>,
    required: true
  }
})

const formFields = props.formFields.filter(f => f.class !== 'Button'),
  buttons = props.formFields.filter(f => f.class === 'Button')

const emits = defineEmits([
  'inputField',
  'submit'
])

const formValues = computed(() => formStore.get.getFormValues(props.formName))


const setFormValues = (formInputEvent: FormEvent) => {
  formStore.do.updateSpecificFormValues(formInputEvent)
}

const isDisabled = (field: FormField) => {
  return field.disabled
    ? field.disabled
    : field.class === 'Button' && validation()
}

const validation = () => {
  // const fieldsToValidate = props.formFields.filter(field => field.validator),
  //   notValidated = []

  // console.log(fieldsToValidate)
  // for (const singleFieldToValidate of fieldsToValidate) {
  //   const fieldKey = singleFieldToValidate.key,
  //     fieldValidator = validators[singleFieldToValidate.validator],
  //     fieldValue = formValues.value[fieldKey]

  //   if (fieldValidator) {
  //     !fieldValidator(fieldValue)
  //       ? notValidated.push(singleFieldToValidate)
  //       : notValidated.filter(field => field.key !== fieldKey)
  //   }
  // }
  // return notValidated.length !== 0
}

const submit = () => {
  emits('submit', formValues.value)
}
</script>