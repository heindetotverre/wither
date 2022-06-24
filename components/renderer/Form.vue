<script setup lang="ts">
  import { PropType } from 'vue'
  import { formStore } from '~~/store/forms'
  import { Form, FormField } from '~~/types/types'
  import { State } from '~~/types/enums'

  const props = defineProps({
    form: {
      type: Object as PropType<Form>,
      required: true
    }
  })

  const emits = defineEmits([
    'inputField',
    'submit'
  ])

  const formValues = computed(() => formStore.get.getFormValues(props.form.formInfo.name)),
    formFields = props.form.fields.filter(f => f.class !== 'Button'),
    buttons = props.form.fields.filter(f => f.class === 'Button'),
    showValidationError = ref()

  const collectValidationMessages = () => {
    return 'Oops, error!'
  }

  const fullFormValidationHasError = () => {
    return formStore.get.getFullFormValidationState(props.form.formInfo.name)
  }

  const isDisabled = (field: FormField) => {
    return field.disabled
      ? field.disabled
      : field.class === 'Button' && fullFormValidationHasError()
  }

  const onBlur = (field: FormField) => {
    formStore.do.validateSingleField({ name: props.form.formInfo.name, key: field.key, property: 'domclass' })
  }

  const onFocus = (field: FormField) => {
    formStore.do.validateSingleField({ name: props.form.formInfo.name, key: field.key, property: 'domclass' }, State.Reset)
    showValidationError.value = false
  }

  const onInput = (field: FormField, event: Event) => {
    emits('inputField', { name: props.form.formInfo.name, key: field.key, property: 'value', value: event })
    formStore.do.updateSpecificFormValues({ name: props.form.formInfo.name, key: field.key, property: 'value', value: event })
  }

  const onSubmit = () => {
    if (fullFormValidationHasError()) {
      showValidationError.value = true
    } else {
      emits('submit', formValues.value)
    }
  }

  const { dynamicComponent } = useComponentResolvement()
</script>

<template>
  <form class="m-t-3 m-b-4" @keypress.enter="onSubmit()">
    <component
      v-for="field in formFields"
      :domclass="field.domclass"
      :is="dynamicComponent(field.component, true)"
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
      <template #error-message>
          <div class="m-t-1 error--message" v-if="!field.validation?.validated">{{ field.validation?.validationMessage }}</div>
      </template>
    </component>
    <div class="m-t-1 error--message" v-if="showValidationError">
      <span>{{ collectValidationMessages() }}</span>
    </div>
    <component
      v-for="(button, index) in buttons"
      class="m-t-2"
      :key="index"
      :is="dynamicComponent(button.component, true)"
      :disabled="isDisabled(button)"
      :label="button.label"
      @click="onSubmit()"
    ></component>
  </form>
</template>
