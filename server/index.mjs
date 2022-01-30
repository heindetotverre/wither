import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
    test: String
  }
`)

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!'
  },
  test: () => {
    return 'This is a test'
  },
};

const app = express()

app.use(cors())

app.use('/gql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000)
console.log('Running a GraphQL API server at http://localhost:4000/gql')