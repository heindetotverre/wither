import { createId } from '~~/utils'
import { FormField, Forms } from '~~/types/types'
import { presetComponents } from '~~/assets/resources/components'

const loginFormName: keyof Forms = 'login',
  registerFormName: keyof Forms = 'register',
  createPageFormName: keyof Forms = 'createPage',
  updateUserInfoFormName: keyof Forms = 'updateUserInfo',
  updateUserCredentialFormName: keyof Forms = 'updateUserCredentials',
  textInputField = {
    class: 'TextInput',
    component: 'UiInput',
    type: 'text',
    required: true,
    visible: true
  },
  emailInputField = {
    class: 'emailInput',
    component: 'UiInput',
    type: 'email',
    required: true,
    autocomplete: 'username',
    validation: {
      validator: "email",
      validated: true,
      validationMessage: 'is not an email'
    },
    visible: true
  },
  passwordInputField = {
    class: 'PasswordInput',
    component: 'UiInput',
    type: 'password',
    required: true,
    autocomplete: 'current-password',
    validation: {
      validator: "notempty",
      validated: true,
      validationMessage: 'password not compliant with password rules'
    },
    visible: true
  },
  selectInputField = {
    class: 'SelectInput',
    component: 'UiSelect',
    type: 'select',
    options: [],
    visible: true
  },
  checkboxInputField = {
    class: 'CheckboxInput',
    component: 'UiCheckbox',
    type: 'checkbox',
    visible: true
  },
  button = {
    class: 'Button',
    component: 'UiButton',
    visible: true
  }

const componentKeys = presetComponents.map(component => component.key)

export const presetForms = {
  login: {
    formInfo: {
      name: loginFormName,
      multipart: false,
      parts: []
    },
    fields: [
      {
        ...emailInputField,
        key: 'email',
        label: 'email',
        id: createId(loginFormName)
      },
      {
        ...passwordInputField,
        key: 'password',
        label: 'password',
        id: createId(loginFormName)
      },
      {
        ...button,
        key: 'button',
        label: 'Login',
        id: createId(loginFormName)
      }
    ] as FormField[]
  },
  register: {
    formInfo: {
      name: registerFormName,
      multipart: false,
      parts: []
    },
    fields: [
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
        label: 'email',
        id: createId(registerFormName)
      },
      {
        ...passwordInputField,
        key: 'password',
        label: 'password',
        id: createId(registerFormName)
      },
      {
        ...passwordInputField,
        label: 'password again',
        key: 'passwordCheck',
        id: createId(registerFormName)
      },
      {
        ...button,
        label: 'Register',
        key: 'button',
        id: createId(registerFormName)
      }
    ] as FormField[]
  },
  createPage: {
    formInfo: {
      name: createPageFormName,
      multipart: true,
      parts: ['general', 'meta', 'content']
    },
    fields: [
      {
        formPart: 'general',
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
        formPart: 'general',
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
        formPart: 'general',
        ...checkboxInputField,
        label: 'is in menu',
        key: 'isInMenu',
        id: createId(createPageFormName)
      },
      {
        formPart: 'general',
        ...selectInputField,
        label: 'parent',
        key: 'pageMenuParent',
        options: [],
        id: createId(createPageFormName),
        validation: {
          validator: "novalidator",
          validated: true,
          validationMessage: ''
        },
        visible: false
      },
      {
        formPart: 'general',
        ...selectInputField,
        label: 'order',
        key: 'pageMenuOrder',
        options: [],
        id: createId(createPageFormName),
        validation: {
          validator: "onlynumbers",
          validated: true,
          validationMessage: ''
        },
        visible: false
      },
      {
        formPart: 'meta',
        ...textInputField,
        label: 'title',
        key: 'title',
        id: createId(createPageFormName),
        validation: {
          validator: "notempty",
          validated: true,
          validationMessage: 'no special characters allowed'
        }
      },
      {
        formPart: 'meta',
        ...textInputField,
        label: 'description',
        key: 'description',
        id: createId(createPageFormName),
        validation: {
          validator: "notempty",
          validated: true,
          validationMessage: 'no special characters allowed'
        }
      },
      {
        formPart: 'meta',
        ...textInputField,
        label: 'keywords',
        key: 'keywords',
        id: createId(createPageFormName),
        validation: {
          validator: "notempty",
          validated: true,
          validationMessage: 'no special characters allowed'
        }
      },
      {
        formPart: 'content',
        ...selectInputField,
        component: 'UiMultiSelect',
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
        ...button,
        label: 'Save',
        key: 'savePage',
        id: createId(updateUserInfoFormName)
      }
    ] as FormField[],
  },
  updateUserInfo:
  {
    formInfo: {
      name: updateUserInfoFormName,
      multipart: false,
      parts: []
    },
    fields: [
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
        label: 'email',
        id: createId(updateUserInfoFormName)
      },
      {
        ...button,
        label: 'Save',
        key: 'saveUserInfo',
        id: createId(updateUserInfoFormName)
      }
    ] as FormField[]
  },
  updateUserCredentials: {
    formInfo: {
      name: updateUserCredentialFormName,
      multipart: false,
      parts: []
    },
    fields: [
      {
        ...passwordInputField,
        key: 'oldPassword',
        label: 'old password',
        id: createId(updateUserCredentialFormName)
      },
      {
        ...passwordInputField,
        key: 'password',
        label: 'password',
        id: createId(updateUserCredentialFormName)
      },
      {
        ...passwordInputField,
        key: 'passwordCheck',
        label: 'password again',
        id: createId(updateUserCredentialFormName)
      },
      {
        ...button,
        label: 'Save',
        key: 'saveUserCredentials',
        id: createId(updateUserCredentialFormName)
      }
    ] as FormField[]
  }
}
