import { Db } from 'mongodb'
import { UserSchema } from '../models'
import { User } from '~~/types'

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

const insertUser = (db : Db, requestBody) => {
  const collection = db.collection('users')
  const user : User = requestBody.data
  collection.insertOne(user)
  return {
    message: 'User succesfully registered'
  }
}