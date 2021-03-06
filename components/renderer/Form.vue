<script setup lang="ts">
  import { PropType } from 'vue'
  import { formStore } from '~~/store/forms'
  import { Form, FormField } from '~~/types/types'
  import { State } from '~~/types/enums'

  const props = defineProps({
    form: {
      type: Object as PropType<Form>,
      required: true
    },
    id: {
      type: String,
      default: ''
    }
  })

  const emits = defineEmits([
    'inputField',
    'submit'
  ])

  const formValues = computed(() => formStore.get.getFormValues(props.form.pageInfo.name)),
    formFields = props.form.fields.filter(f => f.component !== 'UiButton'),
    buttons = props.form.fields.filter(f => f.component === 'UiButton'),
    showValidationError = ref()

  onMounted(() => {
    mapValidationMessagesToContent()
  })

  const { $content } = useNuxtApp()

  const collectValidationMessages = () => {
    return 'Oops, error!'
  }

  const componentClass = (field : FormField) => {
    return [field.domclass, field.elementName].join(' ')
  }

  const fullFormValidationHasError = () => {
    return formStore.get.getFullFormValidationState(props.form.pageInfo.name)
  }

  const isDisabled = (field: FormField) => {
    return field.disabled
      ? field.disabled
      : field.component === 'UiButton' && fullFormValidationHasError()
  }

  const mapValidationMessagesToContent = () => {
    formFields.forEach((field : FormField) => {
      if (field.validation) field.validation.validationMessage = $content(`global.forms.validationErrors.${field.validation.validator}`)
    })
  }

  const onBlur = (field: FormField) => {
    formStore.do.validateSingleField({ name: props.form.pageInfo.name, key: field.key, property: 'domclass' })
  }

  const onFocus = (field: FormField) => {
    formStore.do.validateSingleField({ name: props.form.pageInfo.name, key: field.key, property: 'domclass' }, State.Reset)
    showValidationError.value = false
  }

  const onInput = (field: FormField, event: Event) => {
    emits('inputField', { name: props.form.pageInfo.name, key: field.key, property: 'value', value: event })
    formStore.do.updateSpecificFormValues({ name: props.form.pageInfo.name, key: field.key, property: 'value', value: event })
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
    <div
      v-for="field in formFields"
      :class="`form__field form__field--${field.key}`"
    >
      <component
        :domclass="componentClass(field)"
        :is="dynamicComponent(field.component)"
        :autocomplete="field.autocomplete"
        :disabled="isDisabled(field)"
        :elementName="field.elementName"
        :id="field.id"
        :label="$content(`global.forms.labels.${field.key}`)"
        :key="field.key"
        :name="field.key"
        :pageId="id"
        :type="field.type"
        :options="field.options"
        :value="field.value"
        :validation="field.validation"
        :visible="field.visible"
        @blur="onBlur(field)"
        @focus="onFocus(field)"
        @input="onInput(field, $event)"
      >
        <template #label>
          <label :for="field.id" class="input__label">{{ field.label }}</label>
        </template>
        <template #error-message>
            <div class="m-t-1 error--message" v-if="!field.validation?.validated">{{ field.validation?.validationMessage }}</div>
        </template>
      </component>
    </div>
    <div class="m-t-1 error--message" v-if="showValidationError">
      <span>{{ collectValidationMessages() }}</span>
    </div>
    <component
      v-for="(button, index) in buttons"
      class="m-t-2"
      :key="index"
      :is="dynamicComponent(button.component)"
      :disabled="isDisabled(button)"
      :label="$content(`global.forms.buttons.${button.key}`)"
      @click="onSubmit()"
    ></component>
  </form>
</template>
