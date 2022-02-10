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
      label: 'email', id: createId(loginFormName),
      autocomplete: 'username',
      validation: {
        validator: "email",
        validated: true,
        validationMessage: 'is not an email'
      }
    },
    {
      class: 'PasswordInput',
      component: 'UiInput',
      key: 'password',
      type: 'password',
      required: true,
      label: 'password', id: createId(loginFormName),
      autocomplete: 'current-password',
      validation: {
        validator: "notempty",
        validated: true,
        validationMessage: 'password not compliant with password rules'
      }
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
      label: 'firstname',
      key: 'firstName',
      id: createId(registerFormName),
      validation: {
        validator: "notempty",
        validated: true,
        validationMessage: 'no numbers allowed'
      }
    },
    {
      class: 'TextInput',
      component: 'UiInput',
      type: 'text',
      required: true,
      label: 'lastname',
      key: 'lastName',
      id: createId(registerFormName),
      validation: {
        validator: "notempty",
        validated: true,
        validationMessage: 'no numbers allowed'
      }
    },
    {
      class: 'emailInput',
      component: 'UiInput',
      key: 'email',
      type: 'email',
      required: true,
      label: 'email',
      id: createId(registerFormName),
      autocomplete: 'username',
      validation: {
        validator: "email",
        validated: true,
        validationMessage: 'is not an email'
      }
    },
    {
      class: 'PasswordInput',
      component: 'UiInput',
      key: 'password',
      type: 'password',
      required: true,
      label: 'password', id: createId(registerFormName),
      autocomplete: 'current-password',
      validation: {
        validator: "password",
        validated: true,
        validationMessage: 'password not compliant with password rules'
      }
    },
    {
      class: 'PasswordInput',
      component: 'UiInput',
      type: 'password',
      required: true,
      label: 'password again',
      key: 'passwordCheck',
      id: createId(registerFormName),
      autocomplete: 'current-password',
      validation: {
        validator: "notempty",
        validated: true,
        validationMessage: 'password not compliant with password rules'
      }
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
      label: 'name',
      key: 'name',
      id: createId(formName),
      validation: {
        validator: "notempty",
        validated: true,
        validationMessage: 'no special characters allowed'
      }
    },
    {
      class: 'TextInput',
      component: 'UiInput',
      type: 'text',
      required: true,
      label: 'slug',
      key: 'slug',
      id: createId(formName),
      validation: {
        validator: "slug",
        validated: true,
        validationMessage: 'slug must start with "/"'
      }
    },
    {
      class: 'SelectInput',
      component: 'UiSelect',
      type: 'select',
      label: 'parent',
      key: 'parentPage',
      options: pageNames(),
      id: createId(formName),
      validation: {
        validator: "novalidator",
        validated: true,
        validationMessage: ''
      }
    },
    {
      class: 'SelectInput',
      component: 'UiSelect',
      type: 'select',
      label: 'components',
      key: 'pageComponents',
      options: componentKeys(),
      id: createId(formName),
      validation: {
        validator: "notempty",
        validated: true,
        validationMessage: 'no components selected'
      }
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
