enum AdminSearch {
  Admin = 'admin',
  PageManagement = 'page-management',
  PageCreation = 'page-creation',
  UserEdit = 'user-edit'
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
  AdminSearch,
  Cookie,
  Group,
  Render,
  State
}