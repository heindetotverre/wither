import { reactive, readonly, } from 'vue'
import { Forms, FormEvent } from '~~/types'
import { State } from '~~/types/enums'
import { adminStore } from '~~/store/admin'
import { presetForms } from '~~/assets/resources/forms'
import validators from '~~/utils/validators'

// externals
const initialState = {
  forms: presetForms
}

const state = reactive({
  ...initialState
})

const getCreatePageForm = () => {
  if (!adminStore.get.getPages.length) {
    state.forms.createPage.map(f => {
      if (f.key === 'name') {
        updateSpecificFormValues({ name: 'createPage', key: f.key, property: 'value', value: 'home' })
        updateSpecificFormValues({ name: 'createPage', key: f.key, property: 'disabled', value: true })
      }
      if (f.key === 'slug') {
        updateSpecificFormValues({ name: 'createPage', key: f.key, property: 'value', value: '/' })
        updateSpecificFormValues({ name: 'createPage', key: f.key, property: 'disabled', value: true })
      }
    })
  } else {
    state.forms.createPage.map(f => {
      if (f.key === 'name') {
        updateSpecificFormValues({ name: 'createPage', key: f.key, property: 'value', value: '' })
        updateSpecificFormValues({ name: 'createPage', key: f.key, property: 'disabled', value: false })
      }
      if (f.key === 'slug') {
        updateSpecificFormValues({ name: 'createPage', key: f.key, property: 'value', value: '' })
        updateSpecificFormValues({ name: 'createPage', key: f.key, property: 'disabled', value: false })
      }
    })
  }
  return state.forms.createPage
}

const getFormValues = (formName: keyof Forms) => {
  return state.forms[formName].reduce((acc: any, curr) => {
    return curr.class !== 'Button'
      ? { ...acc, [curr.key]: curr.value }
      : acc
  }, {})
}

const getFullFormValidationState = (formName: keyof Forms) => {
  const formFields = state.forms[formName]
  const fieldsToValidate = formFields.filter(field => field.required),
    notValidated = []

  for (const singleFieldToValidate of fieldsToValidate) {
    const fieldKey = singleFieldToValidate.key,
      fieldValidator = validators[singleFieldToValidate.validation.validator],
      fieldValue = getFormValues(formName)[fieldKey]

    if (fieldValidator) {
      !fieldValidator(fieldValue)
        ? notValidated.push(singleFieldToValidate)
        : notValidated.filter(field => field.key !== fieldKey)
    }
  }
  return notValidated.length !== 0
}

const updateAllFormValues = () => {

}

const updateSpecificFormValues = (input: FormEvent) => {
  const field = state.forms[input.name].find(f => f.key === input.key)
  if (field) {
    field[input.property] = input.value
  }
}

const validateSingleField = (input: FormEvent, reset: State | void) => {
  let domclass = '',
    field = state.forms[input.name].find(f => f.key === input.key)

  if (field) {
    if (reset !== State.Reset) {
      if (field.value.length && !validators[field.validation.validator](field.value)) {
        domclass = 'error'
        field.validation.validated = false
      } else {
        domclass = ''
        field.validation.validated = true
      }
    } else {
      domclass = ''
      field.validation.validated = true
    }
    field[input.property] = domclass
  }
}

// exports
export const formStore = readonly({
  state: state,
  do: {
    updateAllFormValues,
    updateSpecificFormValues,
    validateSingleField
  },
  get: {
    getCreatePageForm,
    getFormValues,
    getFullFormValidationState
  }
})