import { reactive, readonly, } from 'vue'
import { createId, flattenObject } from '~~/utils'
import formFieldsIndex from '~~/server/resources/formFieldsIndex.json'
import pageComponents from '~~/server/resources/pageComponentIndex.json'
import { adminStore } from './admin'

const loginFormName = 'loginUser'
const registerFormName = 'registerUser'
const formName = 'createPage'

const pageNames = () => flattenObject(adminStore.get.getPages).map(page => page.name)
const componentKeys = () => pageComponents.map(component => component.key)

// externals
const initialState = {
  forms: {
    login: [
      { ...formFieldsIndex.find(field => field.class === 'EmailInput'), label: 'email', id: createId(loginFormName), autocomplete: 'username' },
      { ...formFieldsIndex.find(field => field.class === 'PasswordInput'), label: 'password', id: createId(loginFormName), autocomplete: 'current-password' },
      { ...formFieldsIndex.find(field => field.class === 'Button'), label: 'Login', id: createId(loginFormName) }
    ],
    register: [
      { ...formFieldsIndex.find(field => field.class === 'TextInput'), label: 'firstname', key: 'firstName', id: createId(registerFormName) },
      { ...formFieldsIndex.find(field => field.class === 'TextInput'), label: 'lastname', key: 'lastName', id: createId(registerFormName) },
      { ...formFieldsIndex.find(field => field.class === 'EmailInput'), label: 'email', id: createId(registerFormName), autocomplete: 'username' },
      { ...formFieldsIndex.find(field => field.class === 'PasswordInput'), label: 'password', id: createId(registerFormName), autocomplete: 'current-password' },
      { ...formFieldsIndex.find(field => field.class === 'PasswordInput'), label: 'password again', key: 'passwordCheck', id: createId(registerFormName), autocomplete: 'current-password' },
      { ...formFieldsIndex.find(field => field.class === 'Button'), label: 'Register', key: 'button', id: createId(registerFormName) }
    ],
    createPage: [
      { ...formFieldsIndex.find(field => field.class === 'TextInput'), label: 'name', key: 'name', id: createId(formName) },
      { ...formFieldsIndex.find(field => field.class === 'TextInput'), label: 'slug', key: 'slug', id: createId(formName), validator: 'slug' },
      { ...formFieldsIndex.find(field => field.class === 'SelectInput'), label: 'parent', key: 'parentPage', options: pageNames(), id: createId(formName) },
      { ...formFieldsIndex.find(field => field.class === 'SelectInput'), label: 'components', key: 'pageComponents', options: componentKeys(), id: createId(formName) },
      { ...formFieldsIndex.find(field => field.class === 'Button'), label: 'Save', key: 'savePage', id: createId(formName) }
    ]
  }
}

const state = reactive({
  ...initialState
})

const setFormForHomePage = () => {
  console.log('set form for home page')
}

// exports
export const formStore = readonly({
  state: state,
  do: {
    setFormForHomePage
  },
  get: {}
})
