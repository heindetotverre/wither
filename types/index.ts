interface Page {
  slug: string
  level: number,
  name: string,
  id: string,
  author: string,
  parent: string,
  components: Array<String>,
  meta: Record<string, any>
}

interface User {
  group: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

interface UserForm {
  firstName: User['firstName'],
  lastName: User['lastName'],
  email: User['email'],
  password: User['password'],
  passwordCheck?: User['password']
}

interface LoginForm {
  email: User['email'],
  password: User['password']
}

interface FormField {
  autocomplete?: string,
  class: string,
  component: string,
  disabled?: boolean,
  domclass?: string,
  id: string,
  key: string,
  label: string,
  options?: string[],
  type: string,
  required?: boolean,
  validation: {
    validator: keyof Validators,
    validated: boolean,
    validationMessage: string,
  }
  value: any
}

interface Validators {
  email: Validator,
  notempty: Validator,
  slug: Validator
}

interface Validator {
  (input: string): boolean
}

interface FormEvent {
  name: keyof Forms,
  key: string,
  property: keyof FormField
  value?: any
}

interface Forms {
  createPage: FormField[],
  login: FormField[],
  register: FormField[]
}

interface Token {
  id: string,
  user: string,
  group: string,
  created: number
}

export {
  Forms,
  FormEvent,
  FormField,
  LoginForm,
  Page,
  User,
  UserForm,
  Token
}