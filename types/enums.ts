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

enum Errors {
  DB_ERROR_GET_TOKEN = 'Error: Couldn\'t retrieve token from db',
  DB_ERROR_DELETE_TOKEN = 'Error: Couldn\'t delete token from db',
  GQL_ERROR_SET_PAGE = 'Error: Couldn\'t create component data or page for page name',
  GQL_ERROR_GET_SINGLE_PAGE = 'Error: Couldn\'t find page for slug',
  GQL_ERROR_DELETE_PAGE = 'Error: Couldn\'t delete page with pageId',
  GQL_ERROR_DELETE_USER = 'Error: Couldn\'t delete page with userId',
  GQL_ERROR_GET_ADMIN_DATA = 'Error: Couldn\'t retireve admin data',
  GQL_ERROR_UPDATE_USER = 'Error: Couldn\'t update page with userId',
  GQL_ERROR_CREATE_TOKEN = 'Error: Couldn\'t create token for user',
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
  Errors,
  FormNames,
  Group,
  Mode,
  Render,
  Sort,
  State
}