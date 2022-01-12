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
  FirstName: string,
  LastName: string,
  Email: string,
  Password: string,
  PasswordCheck?: string
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

interface ServerResponseMessage {
  data?: any,
  message: string,
  description: string
}

export {
  FormField,
  Page,
  User,
  ServerResponseMessage
}