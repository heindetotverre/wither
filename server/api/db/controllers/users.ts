import { Db } from 'mongodb'
import { ServerResponse } from 'http'
import { createError, sendError, send } from 'h3'
import { User, RequestObject } from '~~/types'

const register = async (res : ServerResponse, db : Db, requestBody : RequestObject) => {
  try {
    const exisitingUser = await db.collection('users').findOne({ Email: requestBody.data.Email })
    if (!exisitingUser) {
      const isUserInserted = await insertUser(db, requestBody)
      if (isUserInserted) {
        send(res, JSON.stringify({
          message: 'UserInserted',
          user: requestBody.data
        }))
      } else {
        createError({ statusCode: 500, statusMessage: 'UserNotInserted', data: 'User was not inserted' })
      }
    } else {
      throw createError({ statusCode: 500, statusMessage: 'UserAlreadyExists', data: 'User already exists' })
    }
  } catch (error) {
    sendError(res, error)
  }
}

const login = async (res, db, requestBody) => {
  return 'logged is triggered'
}

const update = (res, db, requestBody) => {
  return 'logged is triggered'
}

export {
  login,
  register,
  update
}

const insertUser = async (db: Db, requestBody : RequestObject) : Promise<boolean> => {
  const collection = db.collection('users')
  const user: User = requestBody.data
  delete user.PasswordCheck
  const addUser = await collection.insertOne(user)
  return addUser.acknowledged
}