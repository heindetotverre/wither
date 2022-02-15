<template>
  <div v-for="(formPart, index) of form.formInfo.parts" :key="index">
    <button @click="handleTab(formPart)">{{ formPart }}</button>
  </div>
  <div v-for="(formPart, index) of form.formInfo.parts" :key="index">
    <RendererForm
      v-if="activeTab === formPart"
      :formName="form.formInfo.name"
      :formFields="form.form.filter(f => f.formPart === formPart)"
      @submit="onSubmit()"
    />
  </div>
  <button @click="onSubmit()">Save page</button>
</template>
<script lang="ts" setup>
import { formStore } from '~~/store/forms'
import { PropType } from 'vue'
import { Form } from '~~/types'

const props = defineProps({
  form: {
    type: Object as PropType<Form>,
    required: true
  }
})

const emits = defineEmits([
  'submit'
])

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