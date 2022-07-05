import { reactive, readonly, } from "vue"
import { ContentField, DynamicForm, FormField } from "~~/types/types"
import { formStore } from "./forms"
import { textInputField, imageInputfield } from "~~/assets/resources/definedForms"
import { createId, flattenArray, sanitzeComponentContent } from "~~/utils"

// externals
const initialState = {
  contentFields: [] as DynamicForm[]
}

const state = reactive({
  ...initialState
})

const createdFields = (componentId: string, slug: string, pageId: string) => {
  const fieldsPerPage = formStore.get.getAllDynamicFormsById(pageId)
  const fieldsPerComponent = fieldsPerPage?.find((f) => f.pageInfo.name === componentId)
  const parseFields = () => fieldsPerComponent?.fields?.reduce((acc, curr) => {
    return { ...acc, [curr.key]: curr.value }
  }, {})
  return parseFields() || {}
}

const registerFields = (fields: ContentField[], formId: string, slug: string, pageId: string) => {
  const formFields = flattenArray(fields).map(field => {
    return getFormfield(field)
  })
  const form: DynamicForm = {
    pageInfo: {
      id: pageId,
      name: formId,
      slug: slug
    },
    fields: formFields.filter(f => f !== undefined) as FormField[]
  }
  formStore.do.setDynamicForm(sanitzeComponentContent(form), 'register')
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
  const { type, name, label } = field
  if (type === 'text') {
    return {
      ...textInputField,
      key: name,
      label: label,
      id: createId(name),
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
      key: name,
      label: label,
      id: createId(name),
      value: field.default,
      validation: {
        validator: "novalidator",
        validated: true,
        validationMessage: ''
      }
    }
  }
}