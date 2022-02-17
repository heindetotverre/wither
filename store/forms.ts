import { reactive, readonly, } from 'vue'
import { Forms, FormEvent, FormField, Form } from '~~/types/types'
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
  updateAllFormValues('createPage', 'clear')
  if (!adminStore.get.getPages().length) {
    state.forms.createPage.fields.map(f => {
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
    updateSpecificFormValues({ name: 'createPage', key: 'pageMenuParent', property: 'options', value: adminStore.get.getPages().map(p => p.name) })
    updateSpecificFormValues({ name: 'createPage', key: 'pageMenuOrder', property: 'options', value: adminStore.get.getPages().map((p, index) => index) })
    state.forms.createPage.fields.map(f => {
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
  return state.forms[formName].fields.reduce((acc: any, curr) => {
    return curr.class !== 'Button'
      ? { ...acc, [curr.key]: curr.value }
      : acc
  }, {})
}

const getFullFormValidationState = (formName: keyof Forms) => {
  const fieldsToValidate = state.forms[formName].fields.filter(field => field.required),
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

const getLoginForm = () => {
  return state.forms.login.fields
}

const getRegisterForm = () => {
  return state.forms.register.fields
}

const getUpdateUserInfoForm = () => {
  return state.forms.updateUserInfo.fields
}

const getUpdateUserCredentialsForm = () => {
  return state.forms.updateUserCredentials.fields
}

const setFormValuesBasedOnQuery = (formName: keyof Forms, queriedObject: Record<string, any>) => {
  const keys = Object.keys(queriedObject),
    values = Object.values(queriedObject)

  keys.forEach((k, i) => {
    if (state.forms[formName]) {
      updateSpecificFormValues({ name: formName, key: k, property: 'value', value: values[i] })
    }
  })
}

const updateAllFormValues = (formName: keyof Forms, method: string | void) => {
  if (method === 'clear') {
    state.forms[formName].fields.forEach(field => {
      if (field.key === 'pageComponents') {
        updateSpecificFormValues({ name: formName, key: field.key, property: 'value', value: [] })
      } else if (field.type === 'checkbox') {
        updateSpecificFormValues({ name: formName, key: field.key, property: 'value', value: false })
      } else {
        updateSpecificFormValues({ name: formName, key: field.key, property: 'value', value: '' })
      }
    })
  }
}

const updateSpecificFormValues = (input: FormEvent) => {
  const field = state.forms[input.name].fields.find(f => f.key === input.key)
  if (field) {
    field[input.property] = input.value
  }
}

const validateSingleField = (input: FormEvent, reset: State | void) => {
  let domclass = '',
    field = state.forms[input.name].fields.find(f => f.key === input.key)

  if (field && field.validation && validators[field.validation.validator]) {
    if (reset !== State.Reset) {
      if (field.value && field.value.length && !validators[field.validation.validator](field.value)) {
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
    setFormValuesBasedOnQuery,
    updateAllFormValues,
    updateSpecificFormValues,
    validateSingleField
  },
  get: {
    getCreatePageForm,
    getFormValues,
    getFullFormValidationState,
    getLoginForm,
    getRegisterForm,
    getUpdateUserInfoForm,
    getUpdateUserCredentialsForm
  }
})