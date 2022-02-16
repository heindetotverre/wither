<template>
  <form @keypress.enter="onSubmit()">
    <component
      v-for="field in formFields"
      :domclass="field.domclass"
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
      :validation="field.validation"
      :visible="field.visible"
      @blur="onBlur(field)"
      @focus="onFocus(field)"
      @input="onInput(field, $event)"
    >
      <slot></slot>
      <div v-if="!field.validation?.validated">{{ field.validation?.validationMessage }}</div>
    </component>
    <div class="error" v-if="showValidationError">
      <span>{{ collectValidationMessages() }}</span>
    </div>
    <component
      v-for="(button, index) in buttons"
      :key="index"
      :is="button.component"
      :disabled="isDisabled(button)"
      :label="button.label"
      @click="onSubmit()"
    ></component>
  </form>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { formStore } from '~~/store/forms'
import { Forms, FormField } from '~~/types'
import { State } from '~~/types/enums'

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

const formValues = computed(() => formStore.get.getFormValues(props.formName))

const formFields = props.formFields.filter(f => f.class !== 'Button'),
  buttons = props.formFields.filter(f => f.class === 'Button'),
  showValidationError = ref()

const emits = defineEmits([
  'inputField',
  'submit'
])

const collectValidationMessages = () => {
  return 'Oops, error!'
}

const isDisabled = (field: FormField) => {
  return field.disabled
    ? field.disabled
    : field.class === 'Button' && fullFormValidation()
}

const onBlur = (field: FormField) => {
  formStore.do.validateSingleField({ name: props.formName, key: field.key, property: 'domclass' })
}

const onFocus = (field: FormField) => {
  formStore.do.validateSingleField({ name: props.formName, key: field.key, property: 'domclass' }, State.Reset)
  showValidationError.value = false
}

const onInput = (field: FormField, event: Event) => {
  emits('inputField', { name: props.formName, key: field.key, property: 'value', value: event })
  formStore.do.updateSpecificFormValues({ name: props.formName, key: field.key, property: 'value', value: event })
}

const onSubmit = () => {
  if (fullFormValidation()) {
    showValidationError.value = true
  } else {
    emits('submit', formValues.value)
  }
}

const fullFormValidation = () => {
  return formStore.get.getFullFormValidationState(props.formName)
}
</script>