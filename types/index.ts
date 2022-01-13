interface Page {
  slug: string
  level: number,
  name: string,
  id: string,
  children: Array<Page>,
  components: Array<String>,
  meta: Record<string, any>
}

interface UserForm {
  Group: string,
  FirstName: string,
  LastName: string,
  Email: string,
  Password: string,
  PasswordCheck?: string
}

interface LoginForm {
  Email: UserForm['Email'],
  Password: UserForm['Password']
}

interface FormField {
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
  UserForm,
  Token
}