import { buildSchema } from 'graphql'

export default buildSchema(`
  type Page {
    id: ID
    slug: String
    level: Int
    name: String
    author: String
    children: [Page]
    components: [String]
  }
  
  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    group: String
  }

  type Token {
    id: ID
    user: String
    group: Group
    uuid: String
    created: Int
  }

  enum Group {
    Default
    Admin
    User
  }

  input PageInput {
    id: ID
    slug: String
    level: Int
    name: String
    author: String
    children: [PageInput]
    components: [String]
  }

  input UserInput {
    id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    group: String
  }

  input TokenInput {
    id: ID
    user: String
    group: Group
    uuid: String
    created: Int
  }

  type Query {
    getPages: [Page]
    getSinglePage(slug: String): Page
    getSingleUser(email: String): User
    getToken(id: ID): Token
  }

  type Mutation {
    createPage(input: PageInput): Page
    createUser(input: UserInput): User
    createToken(input: TokenInput): Token
  }
`)