<template>
  <div v-for="(formPart, index) of form.formInfo.parts" :key="index">
    <button @click="handleTab(formPart)">{{ formPart }}</button>
  </div>
  <div v-for="(formPart, index) of form.formInfo.parts" :key="index">
    <RendererForm
      v-if="activeTab === formPart"
      :formName="form.formInfo.name"
      :formFields="form.fields.filter(f => f.formPart === formPart)"
      @inputField="emits('inputField', $event)"
    />
  </div>
  <component
    v-for="(button, index) in buttons"
    :key="index"
    :is="button.component"
    :disabled="isDisabled(button)"
    :label="button.label"
    @click="onSubmit()"
  ></component>
</template>
<script lang="ts" setup>
import { formStore } from '~~/store/forms'
import { PropType } from 'vue'
import { Form, FormField } from '~~/types/types'

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

const buttons = ref(props.form.fields.filter(f => f.class === 'Button'))

const isDisabled = (field: FormField) => {
  return field.disabled
    ? field.disabled
    : field.class === 'Button' && fullFormValidation()
}

const formValues = computed(() => formStore.get.getFormValues(props.form.formInfo.name)),
  activeTab = ref(props.form.formInfo.parts[0])

const fullFormValidation = () => {
  return formStore.get.getFullFormValidationState(props.form.formInfo.name)
}

const handleTab = (formName: string) => {
  activeTab.value = formName
}

const onSubmit = () => {
  if (!fullFormValidation()) {
    emits('submit', formValues.value)
  }
}
</script>