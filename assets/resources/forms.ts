import { createId } from '~~/utils'
import { flattenObject } from '~~/utils'
import { adminStore } from '~~/store/admin'
import { FormField } from '~~/types'
import { presetComponents } from '~~/assets/resources/components'

const loginFormName = 'loginUser'
const registerFormName = 'registerUser'
const formName = 'createPage'

const pageNames = () => flattenObject(adminStore.get.getPages).map(page => page.name)
const componentKeys = () => presetComponents.map(component => component.key)

export const presetForms = {
  login: [
    {
      class: 'emailInput',
      component: 'UiInput',
      key: 'email',
      type: 'email',
      required: true,
      validator: "email",
      label: 'email', id: createId(loginFormName),
      autocomplete: 'username'
    },
    {
      class: 'PasswordInput',
      component: 'UiInput',
      key: 'password',
      type: 'password',
      required: true,
      validator: 'notempty',
      label: 'password', id: createId(loginFormName),
      autocomplete: 'current-password'
    },
    {
      class: 'Button',
      component: 'UiButton',
      key: 'button',
      label: 'Login',
      id: createId(loginFormName)
    }
  ] as FormField[],
  register: [
    {
      class: 'TextInput',
      component: 'UiInput',
      type: 'text',
      required: true,
      validator: 'notempty',
      label: 'firstname',
      key: 'firstName',
      id: createId(registerFormName)
    },
    {
      class: 'TextInput',
      component: 'UiInput',
      type: 'text',
      required: true,
      validator: 'notempty',
      label: 'lastname',
      key: 'lastName',
      id: createId(registerFormName)
    },
    {
      class: 'emailInput',
      component: 'UiInput',
      key: 'email',
      type: 'email',
      required: true,
      validator: "email",
      label: 'email',
      id: createId(registerFormName),
      autocomplete: 'username'
    },
    {
      class: 'PasswordInput',
      component: 'UiInput',
      key: 'password',
      type: 'password',
      required: true,
      validator: 'notempty',
      label: 'password', id: createId(registerFormName),
      autocomplete: 'current-password'
    },
    {
      class: 'PasswordInput',
      component: 'UiInput',
      type: 'password',
      required: true,
      validator: 'notempty',
      label: 'password again',
      key: 'passwordCheck',
      id: createId(registerFormName),
      autocomplete: 'current-password'
    },
    {
      class: 'Button',
      component: 'UiButton',
      label: 'Register',
      key: 'button',
      id: createId(registerFormName)
    }
  ] as FormField[],
  createPage: [
    {
      class: 'TextInput',
      component: 'UiInput',
      type: 'text',
      required: true,
      validator: 'notempty',
      label: 'name',
      key: 'name',
      id: createId(formName)
    },
    {
      class: 'TextInput',
      component: 'UiInput',
      type: 'text',
      required: true,
      label: 'slug',
      key: 'slug',
      id: createId(formName),
      validator: 'slug'
    },
    {
      class: 'SelectInput',
      component: 'UiSelect',
      type: 'select',
      label: 'parent',
      key: 'parentPage',
      options: pageNames(),
      id: createId(formName)
    },
    {
      class: 'SelectInput',
      component: 'UiSelect',
      type: 'select',
      label: 'components',
      key: 'pageComponents',
      options: componentKeys(),
      id: createId(formName)
    },
    {
      class: 'Button',
      component: 'UiButton',
      label: 'Save',
      key: 'savePage',
      id: createId(formName)
    }
  ] as FormField[]
}
