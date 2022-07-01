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
  GQL_ERROR_GET_TOKEN = 'Error: Couldn\'t retrieve token for id',
  GQL_ERROR_DELETE_TOKEN = 'Error: Couldn\'t delete token for id',
  GQL_ERROR_SET_PAGE = 'Error: Couldn\'t create component data or page for page name',
  GQL_ERROR_GET_SINGLE_PAGE = 'Error: Couldn\'t find page for slug',
  GQL_ERROR_CREATE_USER = 'Error: Couldn\'t create user with email',
  GQL_ERROR_DELETE_PAGE = 'Error: Couldn\'t delete page with pageId',
  GQL_ERROR_DELETE_USER = 'Error: Couldn\'t delete page with userId',
  GQL_ERROR_GET_ADMIN_DATA = 'Error: Couldn\'t retrieve admin data',
  GQL_ERROR_UPDATE_USER = 'Error: Couldn\'t update page with userId',
  GQL_ERROR_CREATE_TOKEN = 'Error: Couldn\'t create token for user',
  GQL_ERROR_SET_FILE_META = 'Error: Couldn\'t set file meta for filename: ',
  GQL_ERROR_GET_ALL_FILE_META = 'Error: Couldn\'t retrieve all file meta',
  GQL_ERROR_GET_SINGLE_FILE_META = 'Error: Couldn\'t retrieve single file meta for id: ',
  GQL_ERROR_DELETE_FILE_META = 'Error: Couldn\'t delete feilMeta with id',
  FE_ERROR_ANIMATION_COMPONENT = 'Error: Only one root element is allowed inside an animation component',
  FE_ERROR_ANIMATION_CHILDREN = 'Error: No child elements found to determine animation for style:',
  FE_ERROR_ANIMATION_STYLE = 'Error: Fallback set: No style value was found for style:',
  FE_ERROR_CONTENT_NOTFOUND = 'Error: No content was found with search path: ',
  FE_ERROR_COMPONENT_NOTFOUND = 'Error: No dynamic component was found for component name: ',
  FE_ERROR_GET_FILE_PATHS = 'Error: Couldn\'t retrieve file paths: ',
  FE_ERROR_SET_FILES = 'Error: Couldn\'t create files on disk',
  BE_ERROR_FILE_BOUNCE_UNSUPPORTED = 'Error: File type not supported',
  BE_ERROR_FILE_BOUNCE_TOO_LARGE = 'Error: File too large',
  DB_ERROR_CANNOT_CONNECT = 'Error: Cannot connect to Mongo Database'
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

enum EventTypes {
  BLUR = 'blur',
  FOCUS = 'focus',
  INPUT = 'input'
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
  State,
  EventTypes
}