import { Db } from 'mongodb'
import { UserSchema } from '../models'
import { User, ServerResponseMessage } from '~~/types'

const register = async (db, requestBody) => {
  try {
    const exisitingUser = await db.collection('users').findOne({ Email: requestBody.data.Email })
    if (!exisitingUser) {
      return insertUser(db, requestBody)
    } else {
      throw new Error('User already exists')
    }
  } catch (error) {
    return error
  }
}

const login = async (db, requestBody) => {
  return 'logged is triggered'
}

const update = (db, requestBody) => {
  return 'logged is triggered'
}

export {
  login,
  register,
  update
}

const insertUser = (db: Db, requestBody): ServerResponseMessage => {
  const collection = db.collection('users')
  const user: User = requestBody.data
  delete user.PasswordCheck
  collection.insertOne(user)
  return {
    data: user,
    message: 'UserRegistrated',
    description: 'User succesfully registered'
  }
}