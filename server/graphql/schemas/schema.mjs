import mongoose from 'mongoose'

const schema = mongoose.Schema

const UserSchema = new schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true
  }
})

const PageSchema = new schema({
  slug: {
    type: String,
    required: true,
  },
  level: {
    type: Number
  },
  name: {
    type: String,
    required: true
  },
  id: {
    type: String
  },
  author: {
    type: String
  },
  children: {
    type: Array
  },
  components: {
    type: Array
  },
  meta: {
    type: Object
  }
})

const TokenSchema = new schema({
  user: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true
  },
  uuid: {
    type: String,
    required: true
  },
  created: {
    type: Number,
    required: true
  }
})

export {
  PageSchema,
  UserSchema,
  TokenSchema
}