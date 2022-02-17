import { reactive, readonly, } from "vue"
import { ContentField, DynamicForm, FormField } from "~~/types/types"
import { formStore } from "./forms"
import { textInputField, imageInputfield } from "~~/assets/resources/forms"
import { createId } from "~~/utils"

// externals
const initialState = {
  contentFields: [] as any[]
}

const state = reactive({
  ...initialState
})

const createdFields = (componentId: string, pageId: string) => {
  const fields = state.contentFields.find(f => f.componentId === componentId && f.pageId === pageId)
  return fields || {}
}

const registerFields = (fields: ContentField[], formId: string) => {
  const formFields = fields.map(field => {
    return getFormfield(field)
  })
  const form: DynamicForm = {
    formInfo: {
      name: formId
    },
    fields: formFields as FormField[]
  }
  formStore.do.insertNewDynamicForm(form)
}

// exports
export const contentStore = readonly({
  state: state,
  do: {
    registerFields
  },
  get: {
    createdFields
  }
})

// internals
const getFormfield = (field: ContentField) => {
  if (field.type === 'text') {
    return {
      ...textInputField,
      key: field.name,
      label: field.label,
      id: createId(field.name),
      value: field.default,
      validation: {
        validator: "novalidator",
        validated: true,
        validationMessage: ''
      }
    }
  } else if (field.type === 'image') {
    return {
      ...imageInputfield,
      key: field.name,
      label: field.name,
      id: createId(field.name),
      value: field.default,
      validation: {
        validator: "novalidator",
        validated: true,
        validationMessage: ''
      }
    }
  }
}