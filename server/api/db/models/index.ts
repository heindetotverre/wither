import mongoose from 'mongoose'
import { Page, User } from '~~/types'

const schema = mongoose.Schema

const UserSchema = new schema<User>({
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
  }
})

const PageSchema = new schema<Page>({
  slug: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  children: {
    type: [] as Array<Page>
  },
  components: {
    type: [] as Array<String>,
    required: true
  },
  meta: {
    type: Object
  }
})

export {
  PageSchema,
  UserSchema
}