import { createId } from '~~/utils'
import { adminStore } from '~~/store/admin'
import { FormField } from '~~/types'
import { presetComponents } from '~~/assets/resources/components'

const loginFormName = 'loginUser',
  registerFormName = 'registerUser',
  createPageFormName = 'createPage',
  updateUserInfoFormName = 'updateUserInfo',
  updateUserCredentials = 'updateUserCredentials',
  textInputField = {
    class: 'TextInput',
    component: 'UiInput',
    type: 'text',
    required: true,
  },
  emailInputField = {
    class: 'emailInput',
    component: 'UiInput',
    type: 'email',
    required: true,
    autocomplete: 'username',
  },
  passwordInputField = {
    class: 'PasswordInput',
    component: 'UiInput',
    type: 'password',
    required: true,
    autocomplete: 'current-password',
  },
  selectInputField = {
    class: 'SelectInput',
    component: 'UiSelect',
    type: 'select',
    options: [],
  }

const componentKeys = presetComponents.map(component => component.key)

export const presetForms = {
  login: [
    {
      ...emailInputField,
      key: 'email',
      label: 'email', id:
        createId(loginFormName),
      validation: {
        validator: "email",
        validated: true,
        validationMessage: 'is not an email'
      }
    },
    {
      ...passwordInputField,
      key: 'password',
      label: 'password',
      id: createId(loginFormName),
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
      ...textInputField,
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
      ...textInputField,
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
      ...emailInputField,
      key: 'email',
      label: 'email', id:
        createId(registerFormName),
      validation: {
        validator: "email",
        validated: true,
        validationMessage: 'is not an email'
      }
    },
    {
      ...passwordInputField,
      key: 'password',
      label: 'password',
      id: createId(registerFormName),
      validation: {
        validator: "notempty",
        validated: true,
        validationMessage: 'password not compliant with password rules'
      }
    },
    {
      ...passwordInputField,
      label: 'password again',
      key: 'passwordCheck',
      id: createId(registerFormName),
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
      ...textInputField,
      label: 'name',
      key: 'name',
      id: createId(createPageFormName),
      validation: {
        validator: "notempty",
        validated: true,
        validationMessage: 'no special characters allowed'
      }
    },
    {
      ...textInputField,
      label: 'slug',
      key: 'slug',
      id: createId(createPageFormName),
      validation: {
        validator: "slug",
        validated: true,
        validationMessage: 'slug must start with "/"'
      }
    },
    {
      ...selectInputField,
      label: 'parent',
      key: 'parentPage',
      options: [],
      id: createId(createPageFormName),
      validation: {
        validator: "novalidator",
        validated: true,
        validationMessage: ''
      }
    },
    {
      ...selectInputField,
      label: 'components',
      key: 'pageComponents',
      options: componentKeys,
      id: createId(createPageFormName),
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
      id: createId(createPageFormName)
    }
  ] as FormField[],
  updateUserInfo: [
    {
      ...textInputField,
      label: 'firstname',
      key: 'firstName',
      id: createId(updateUserInfoFormName),
      validation: {
        validator: "notempty",
        validated: true,
        validationMessage: 'no numbers allowed'
      }
    },
    {
      ...textInputField,
      label: 'lastname',
      key: 'lastName',
      id: createId(updateUserInfoFormName),
      validation: {
        validator: "notempty",
        validated: true,
        validationMessage: 'no numbers allowed'
      }
    },
    {
      ...emailInputField,
      key: 'email',
      label: 'email', id:
        createId(updateUserInfoFormName),
      validation: {
        validator: "email",
        validated: true,
        validationMessage: 'is not an email'
      }
    },
    {
      class: 'Button',
      component: 'UiButton',
      label: 'Save',
      key: 'savePage',
      id: createId(updateUserInfoFormName)
    }
  ] as FormField[],
  updateUserCredentials: [
    {
      ...passwordInputField,
      key: 'oldPassword',
      label: 'old password',
      id: createId(registerFormName),
      validation: {
        validator: "notempty",
        validated: true,
        validationMessage: 'password not compliant with password rules'
      }
    },
    {
      ...passwordInputField,
      key: 'passwordCheck',
      label: 'password',
      id: createId(updateUserCredentials),
      validation: {
        validator: "notempty",
        validated: true,
        validationMessage: 'password not compliant with password rules'
      }
    },
    {
      ...passwordInputField,
      key: 'passwordAgain',
      label: 'password again',
      id: createId(updateUserCredentials),
      validation: {
        validator: "notempty",
        validated: true,
        validationMessage: 'password not compliant with password rules'
      }
    },
    {
      class: 'Button',
      component: 'UiButton',
      label: 'Save',
      key: 'savePage',
      id: createId(updateUserCredentials)
    }
  ] as FormField[]
}
