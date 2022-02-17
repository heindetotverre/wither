enum AdminPath {
  Admin = 'admin',
  Login = 'login',
  Pages = 'page',
  Users = 'user',
  Create = 'create',
  Edit = 'edit',
  Management = 'management'
}

enum Auth {
  Login = 'login',
  Register = 'register'
}

enum Cookie {
  Accepted
}

enum Group {
  Default,
  Admin,
  User
}

enum Render {
  Admin,
  Page
}

enum State {
  Reset
}

export {
  Auth,
  AdminPath,
  Cookie,
  Group,
  Render,
  State
}