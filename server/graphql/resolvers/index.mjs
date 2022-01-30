import { Pages, Users, Tokens } from '../mongooseConnect.mjs'

export default {
  Query: {
    getPages: (root) => {
      return new Promise((resolve, reject) => {
        Pages.find((err, pages) => {
          if (err) reject(err)
          else resolve(pages)
        })
      })
    },
    getSinglePage: (root, { slug }) => {
      return new Promise((resolve, reject) => {
        Pages.findOne({ slug: slug }, (err, series) => {
          if (err) reject(err)
          else resolve(pages)
        })
      })
    },
    getSingleUser: (root, { email }) => {
      return new Promise((resolve, reject) => {
        Users.findOne({ email: email }, (err, series) => {
          if (err) reject(err)
          else resolve(pages)
        })
      })
    },
    getToken: (root, { id }) => {
      return new Promise((resolve, reject) => {
        Tokens.findOne({ id: id }, (err, series) => {
          if (err) reject(err)
          else resolve(pages)
        })
      })
    }
  },
  Mutation: {
    createPage: (root, { PageInput }) => {
      const newPage = new Pages({
        ...PageInput
      })

      newPage.id = newPage._id

      return new Promise((resolve, reject) => {
        newPage.save((err) => {
          if (err) reject(err)
          else resolve(newPage)
        })
      })
    },
    createUser: (root, { UserInput }) => {
      const newUser = new Users({
        ...UserInput
      })

      newUser.id = newUser._id

      return new Promise((resolve, reject) => {
        newUser.save((err) => {
          if (err) reject(err)
          else resolve(newUser)
        })
      })
    },
    createToken: (root, { TokenInput }) => {
      const newToken = new Tokens({
        ...TokenInput
      })

      newToken.id = newToken._id

      return new Promise((resolve, reject) => {
        newToken.save((err) => {
          if (err) reject(err)
          else resolve(newToken)
        })
      })
    }
  }
}