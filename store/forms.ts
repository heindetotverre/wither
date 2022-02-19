import { reactive, readonly, } from 'vue'
import { Forms, FormEvent, DynamicForm } from '~~/types/types'
import { State } from '~~/types/enums'
import { adminStore } from '~~/store/admin'
import { presetForms } from '~~/assets/resources/forms'
import validators from '~~/utils/validators'

// externals
const initialState = {
  presetForms: presetForms,
  dynamicForms: [] as DynamicForm[]
}

const state = reactive({
  ...initialState
})

const getCreatePageForm = () => {
  updateAllFormValues('createPage', 'clear')
  if (!adminStore.get.getPages().length) {
    state.presetForms.createPage.fields.map(f => {
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
    state.presetForms.createPage.fields.map(f => {
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
  return state.presetForms.createPage
}

const getDynamicFormById = (id: string) => {
  const form = state.dynamicForms.find(f => f.formInfo.name === id)
  if (form) {
    return form
  }
}

const getAllDynamicFormsBySlug = (slug: string) => {
  const forms = state.dynamicForms.filter(f => f.formInfo.slug === slug)
  if (forms.length) {
    return forms
  }
}

const getFormValues = (formName: keyof Forms) => {
  return state.presetForms[formName].fields.reduce((acc: any, curr) => {
    return curr.class !== 'Button'
      ? { ...acc, [curr.key]: curr.value }
      : acc
  }, {})
}

const getFullFormValidationState = (formName: keyof Forms) => {
  const presetForm = state.presetForms[formName],
    fieldsToValidate = presetForm
      ? presetForm.fields.filter(field => field.required)
      : state.dynamicForms.find(f => f.formInfo.name === formName)?.fields.filter(field => field.required),
    notValidated = []

  if (fieldsToValidate) {
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
}

const getLoginForm = () => {
  return state.presetForms.login
}

const getRegisterForm = () => {
  return state.presetForms.register
}

const getSpecificFormValue = (formName: keyof Forms, key: string) => {
  const presetForm = state.presetForms[formName],
    field = presetForm
      ? presetForm.fields.find(f => f.key === key)
      : state.dynamicForms.find(f => f.formInfo.name === formName)?.fields.find(f => f.key === key)
  if (field) {
    return field.value
  }
}

const getUpdateUserInfoForm = () => {
  return state.presetForms.updateUserInfo
}

const getUpdateUserCredentialsForm = () => {
  return state.presetForms.updateUserCredentials
}

const setDynamicForm = (form: DynamicForm, source: string | void) => {
  const existingForm = state.dynamicForms.find(f => f.formInfo.name === form.formInfo.name)
  if (existingForm) {
    if (source === 'register') {
      return
    }
    state.dynamicForms = state.dynamicForms.filter(f => f.formInfo.name !== form.formInfo.name)
  }
  state.dynamicForms.push(form)
}

const setFormValuesBasedOnQuery = (formName: keyof Forms, queriedObject: Record<string, any>) => {
  const keys = Object.keys(queriedObject),
    values = Object.values(queriedObject)

  keys.forEach((k, i) => {
    if (state.presetForms[formName]) {
      updateSpecificFormValues({ name: formName, key: k, property: 'value', value: values[i] })
    }
  })
}

const updateAllFormValues = (formName: keyof Forms, method: string | void) => {
  if (method === 'clear') {
    state.presetForms[formName].fields.forEach(field => {
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
  const presetForm = state.presetForms[input.name],
    field = presetForm
      ? presetForm.fields.find(f => f.key === input.key)
      : state.dynamicForms.find(f => f.formInfo.name === input.name)?.fields.find(f => f.key === input.key)
  if (field) {
    field[input.property] = input.value
  }
}

const validateSingleField = (input: FormEvent, reset: State | void) => {
  let domclass = ''
  const presetForm = state.presetForms[input.name],
    field = presetForm
      ? presetForm.fields.find(f => f.key === input.key)
      : state.dynamicForms.find(f => f.formInfo.name === input.name)?.fields.find(f => f.key === input.key)
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
    setDynamicForm,
    setFormValuesBasedOnQuery,
    updateAllFormValues,
    updateSpecificFormValues,
    validateSingleField
  },
  get: {
    getCreatePageForm,
    getDynamicFormById,
    getAllDynamicFormsBySlug,
    getFormValues,
    getFullFormValidationState,
    getLoginForm,
    getRegisterForm,
    getSpecificFormValue,
    getUpdateUserInfoForm,
    getUpdateUserCredentialsForm
  }
})