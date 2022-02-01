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
  key: string,
  type: string,
  required: boolean,
  label: string,
  id: string
}

interface RequestObject {
  data: any
}

interface Token {
  uuid: string,
  user: string,
  group: string,
  created: number
}

export {
  FormField,
  LoginForm,
  Page,
  RequestObject,
  User,
  UserForm,
  Token
}