import { reactive, readonly, } from "vue"
import { ContentField, DynamicForm, FormField } from "~~/types/types"
import { formStore } from "./forms"
import { textInputField, imageInputfield } from "~~/assets/resources/forms"
import { createId, flattenObject } from "~~/utils"

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
  const parsedFields = fieldsForComponent?.fields?.reduce((acc, curr) => {
    return { ...acc, [curr.key]: curr.value }
  }, {})
  return parsedFields || {}
}

const registerFields = (fields: ContentField[], formId: string, slug: string) => {
  const formFields = flattenObject(fields).map(field => {
    // if (field.children) {
    //   console.log(field)
    // }
    return getFormfield(field)
  })
  const form: DynamicForm = {
    formInfo: {
      name: formId,
      slug: slug
    },
    fields: formFields.filter(f => f !== undefined) as FormField[]
  }
  formStore.do.setDynamicForm(contentStore.do.sanitzeContent(form), 'register')
}

const sanitzeContent = (content: DynamicForm) => {
  delete content.__typename
  delete content.formInfo.__typename
  content.fields.forEach(f => {
    delete f.__typename
    delete f.validation.__typename
  })
  return content
}

// exports
export const contentStore = readonly({
  state: state,
  do: {
    registerFields,
    sanitzeContent
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