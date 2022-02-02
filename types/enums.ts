enum AdminSearch {
  Admin = 'admin',
  PageManagement = 'page-management',
  PageCreation = 'page-creation'
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

export {
  AdminSearch,
  Cookie,
  Group,
  Render
}