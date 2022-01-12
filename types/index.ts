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
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

export {
  Page,
  User
}