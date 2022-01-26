import { gql } from "@apollo/client/core/core.cjs"

export const GET_POSTS = gql`
  query pages {
    pages {
      name
      slug
    }
  }
`