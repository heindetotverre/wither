<script lang="ts" setup>
  import { formStore } from '~~/store/forms'
  import { PropType } from 'vue'
  import { Form, FormField } from '~~/types/types'
  import LazyRendererForm from "~~/components/renderer/Form.vue"

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

  const buttons = ref(props.form.fields.filter(f => f.component === 'UiButton'))

  const isDisabled = (field: FormField) => {
    return field.disabled
      ? field.disabled
      : field.component === 'UiButton' && fullFormValidationHasError()
  }

  const formValues = computed(() => formStore.get.getFormValues(props.form.pageInfo.name)),
    activeTab = ref(props.form.pageInfo.parts[0])

  const fullFormValidationHasError = () => {
    return formStore.get.getFullFormValidationState(props.form.pageInfo.name)
  }

  const getSplitForm = (formPart: string): Form => {
    return {
      pageInfo: props.form.pageInfo,
      fields: props.form.fields.filter(f => f.formPart === formPart)
    }
  }

  const handleTab = (formName: string) => {
    activeTab.value = formName
  }

  const onSubmit = () => {
    if (!fullFormValidationHasError()) {
      emits('submit', formValues.value)
    }
  }

  const { dynamicComponent } = useComponentResolvement()
</script>

<template>
  <div class="tabs m-t-1">
    <div class="tabs__tab" v-for="(formPart, index) of form.pageInfo.parts" :key="index">
      <button @click="handleTab(formPart)">{{ formPart }}</button>
    </div>
  </div>
  <div v-for="(formPart, index) of form.pageInfo.parts" :key="index">
    <LazyRendererForm
      v-if="activeTab === formPart"
      :form="getSplitForm(formPart)"
      :id="id"
      @inputField="emits('inputField', $event)"
    />
  </div>
  <component
    v-for="(button, index) in buttons"
    :key="index"
    :is="dynamicComponent(button.component)"
    :disabled="isDisabled(button)"
    :label="button.label"
    @click="onSubmit()"
  ></component>
</template>

<style lang="scss" scoped>
  .tabs {
    display: flex;
  }
</style>