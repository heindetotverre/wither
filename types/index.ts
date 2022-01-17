interface Page {
  slug: string
  level: number,
  name: string,
  id: string,
  children: Array<Page>,
  components: Array<String>,
  meta: Record<string, any>
}

interface User {
  Group: string,
  FirstName: string,
  LastName: string,
  Email: string,
  Password: string
}

interface UserForm {
  FirstName: User['FirstName'],
  LastName: User['LastName'],
  Email: User['Email'],
  Password: User['Password'],
  PasswordCheck?: User['Password']
}

interface LoginForm {
  Email: User['Email'],
  Password: User['Password']
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