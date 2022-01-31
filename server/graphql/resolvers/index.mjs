import { Pages, Users, Tokens } from '../mongooseConnect.mjs'

export default {
  getPages: async () => {
    try {
      const pages = await Pages.find({})
      if (!pages) {
        throw new Error(`No pages present`)
      }
      return pages
    } catch (error) {
      throw error
    }
  },
  getSinglePage: async ({ slug }) => {
    try {
      const page = await Pages.findOne({ slug: slug })
      if (!page) {
        throw new Error(`Page not found with: ${slug}`)
      }
      return page
    } catch (error) {
      throw error
    }
  },
  getSingleUser: async ({ email }) => {
    try {
      const user = await Users.findOne({ email: email })
      if (!user) {
        throw new Error(`User not found with ${email}`)
      }
      return user
    } catch (error) {
      throw error
    }
  },
  getToken: async ({ id }) => {
    try {
      const token = await Tokens.findOne({ id: id })
      if (!token) {
        throw new Error(`Token not found with ${id}`)
      }
      return token
    } catch (error) {
      throw error
    }
  },
  createPage: async ({ input }) => {
    const newPage = new Pages({
      ...input
    })
    try {
      const existingPage = await Pages.findOne({ slug: input.slug })
      if (existingPage) {
        throw new Error(`Page with ${input.slug} already exists`)
      }
      await newPage.save()
      return newPage
    } catch (error) {
      throw error
    }
  },
  createUser: async ({ input }) => {
    const newUser = new Users({
      ...input
    })
    try {
      const existingUser = await Users.findOne({ email: input.email })
      if (existingUser) {
        throw new Error(`User with ${input.email} already exists`)
      }
      await newUser.save()
      return newUser
    } catch (error) {
      throw error
    }
  },
  createToken: async ({ input }) => {
    const newToken = new Tokens({
      ...input
    })
    try {
      await newToken.save()
      return newToken
    } catch (error) {
      throw error
    }
  },
  deletePage: async ({ id }) => {
    try {
      const deletedPage = await Pages.deleteOne({ id: id })
      if (!deletedPage) {
        throw new Error(`Page with ${id} not found`)
      }
      return deletedPage
    } catch (error) {
      throw error
    }
  },
  deleteToken: async ({ uuid }) => {
    try {
      const token = await Tokens.findOne({ uuid: uuid })
      const deletedToken = await Tokens.deleteOne({ uuid: uuid })
      if (!deletedToken) {
        throw new Error(`Token with ${uuid} not found`)
      }
      return token
    } catch (error) {
      throw error
    }
  }
}