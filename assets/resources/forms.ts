import { createId } from '~~/utils'
import { FormField, Forms } from '~~/types'
import { presetComponents } from '~~/assets/resources/components'

const loginFormName: keyof Forms = 'login',
  registerFormName: keyof Forms = 'register',
  createPageFormName: keyof Forms = 'createPage',
  updateUserInfoFormName: keyof Forms = 'updateUserInfo',
  updateUserCredentials: keyof Forms = 'updateUserCredentials',
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
    validation: {
      validator: "email",
      validated: true,
      validationMessage: 'is not an email'
    }
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
    }
  },
  selectInputField = {
    class: 'SelectInput',
    component: 'UiSelect',
    type: 'select',
    options: [],
  },
  checkboxInputField = {
    class: 'CheckboxInput',
    component: 'UiCheckbox',
    type: 'checkbox'
  },
  button = {
    class: 'Button',
    component: 'UiButton',
  }

const componentKeys = presetComponents.map(component => component.key)

export const presetForms = {
  login: {
    formInfo: {
      name: loginFormName,
      multipart: false,
      parts: []
    },
    form: [
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
    form: [
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
    form: [
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
        formPart: 'general',
        ...selectInputField,
        label: 'order',
        key: 'order',
        options: [],
        id: createId(createPageFormName),
        validation: {
          validator: "onlynumbers",
          validated: true,
          validationMessage: ''
        }
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
    form: [
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
      name: registerFormName,
      multipart: false,
      parts: []
    },
    form: [
      {
        ...passwordInputField,
        key: 'oldPassword',
        label: 'old password',
        id: createId(registerFormName)
      },
      {
        ...passwordInputField,
        key: 'password',
        label: 'password',
        id: createId(updateUserCredentials)
      },
      {
        ...passwordInputField,
        key: 'passwordCheck',
        label: 'password again',
        id: createId(updateUserCredentials)
      },
      {
        ...button,
        label: 'Save',
        key: 'saveUserCredentials',
        id: createId(updateUserCredentials)
      }
    ] as FormField[]
  }
}
