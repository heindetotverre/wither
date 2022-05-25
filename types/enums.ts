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

enum FormNames {
  CREATE_PAGE = 'createPage',
  LOGIN = 'login',
  REGISTER = 'register',
  UPDATE_USER_INFO = 'updateUserInfo',
  UPDATE_USER_CREDENTIALS = 'updateUserCredentials'
}

enum Group {
  Default,
  Admin,
  User
}

enum Mode {
  Front,
  Back
}

enum Render {
  Admin,
  Page
}

enum Sort {
  Up,
  Down
}

enum State {
  Reset
}

export {
  Auth,
  AdminPath,
  Cookie,
  FormNames,
  Group,
  Mode,
  Render,
  Sort,
  State
}