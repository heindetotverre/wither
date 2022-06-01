import { reactive, readonly, } from "vue"
import { ContentField, DynamicForm, FormField } from "~~/types/types"
import { formStore } from "./forms"
import { textInputField, imageInputfield } from "~~/assets/resources/forms"
import { createId, flattenObject, sanitzeContent } from "~~/utils"

// externals
const initialState = {
  contentFields: [] as DynamicForm[]
}

const state = reactive({
  ...initialState
})

const createdFields = (componentId: string, slug: string) => {
  const fieldsForPage = formStore.get.getAllDynamicFormsBySlug(slug)
  const fieldsForComponent = fieldsForPage?.find((f) => f.formInfo.name === componentId)
  const parseFields = () => fieldsForComponent?.fields?.reduce((acc, curr) => {
    return { ...acc, [curr.key]: curr.value }
  }, {})
  return parseFields() || {}
}

const registerFields = (fields: ContentField[], formId: string, slug: string) => {
  const formFields = flattenObject(fields).map(field => {
    return getFormfield(field)
  })
  const form: DynamicForm = {
    formInfo: {
      name: formId,
      slug: slug
    },
    fields: formFields.filter(f => f !== undefined) as FormField[]
  }
  formStore.do.setDynamicForm(sanitzeContent(form), 'register')
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