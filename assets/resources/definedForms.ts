import { createId } from '~~/utils'
import { FormField, Forms } from '~~/types/types'
import { themeComponentsMeta } from '~~/theme/components/index'

const componentKeys = themeComponentsMeta.map(component => component.key)

const loginFormName: keyof Forms = 'login',
  registerFormName: keyof Forms = 'register',
  createPageFormName: keyof Forms = 'createPage',
  updateUserInfoFormName: keyof Forms = 'updateUserInfo',
  updateUserCredentialFormName: keyof Forms = 'updateUserCredentials',
  textInputField = {
    elementName: 'text-input',
    component: 'UiInput',
    type: 'text',
    required: true,
    visible: true
  },
  emailInputField = {
    elementName: 'email-input',
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
    elementName: 'password-input',
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
    elementName: 'select-input',
    component: 'UiSelect',
    type: 'select',
    options: [],
    visible: true
  },
  checkboxInputField = {
    elementName: 'checkbox-input',
    component: 'UiCheckbox',
    type: 'checkbox',
    visible: true
  },
  imageInputfield = {
    elementName: 'image-input',
    component: 'UiFileUpload',
    type: 'file',
    visible: true
  },
  button = {
    elementName: 'button',
    component: 'UiButton',
    visible: true
  }

export {
  textInputField,
  emailInputField,
  passwordInputField,
  selectInputField,
  checkboxInputField,
  imageInputfield
}

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
        key: 'login',
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
          validator: "nonumber",
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
          validator: "nonumber",
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
        key: 'register',
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
        component: 'UiContentSelect',
        label: 'components',
        key: 'pageComponents',
        options: componentKeys,
        id: createId(createPageFormName),
        required: true,
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
          validator: "nonumber",
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
          validator: "nonumber",
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
