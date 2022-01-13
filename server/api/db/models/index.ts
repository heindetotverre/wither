import mongoose from 'mongoose'
import { Page, UserForm, Token } from '~~/types'

const schema = mongoose.Schema

const UserSchema = new schema<UserForm>({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Password: {
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

const TokenSchema = new schema<Token>({
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