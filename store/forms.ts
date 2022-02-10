import { reactive, readonly, } from 'vue'
import { Forms, FormEvent } from '~~/types'
import { adminStore } from '~~/store/admin'
import { presetForms } from '~~/assets/resources/forms'

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

const updateAllFormValues = () => {

}

const updateSpecificFormValues = (input: FormEvent) => {
  const field = state.forms[input.name].find(f => f.key === input.key)
  if (field) {
    field[input.property] = input.value
  }
}

// exports
export const formStore = readonly({
  state: state,
  do: {
    updateAllFormValues,
    updateSpecificFormValues
  },
  get: {
    getCreatePageForm,
    getFormValues
  }
})