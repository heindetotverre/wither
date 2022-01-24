import { Db } from 'mongodb'
import { ServerResponse } from 'http'
import { createError, sendError, send, setCookie } from 'h3'
import { User, UserForm, RequestObject, Token } from '~~/types'
import { createUUID } from '~~/utils'

const deleteUser = async (res: ServerResponse, db: Db, requestBody: RequestObject) => {
  try {

  } catch (error) {
    sendError(res, error)
  }
}

const loginUser = async (res: ServerResponse, db: Db, requestBody: RequestObject) => {
  try {
    const userByEmail = await db.collection('users').findOne({ Email: requestBody.data.Email })
    if (userByEmail) {
      if (userByEmail.Password === requestBody.data.Password) {
        const createdToken = await manageToken(db, 'set', userByEmail) as Token
        setCookie(res, 'witherLoginToken', JSON.stringify({ id: createdToken.uuid }), { path: '/' })
        send(res, JSON.stringify({
          message: 'UserLoggedIn',
          tokenId: createdToken.uuid,
          user: {
            firstName: userByEmail.FirstName,
            lastName: userByEmail.LastName,
            mail: userByEmail.Email
          }
        }))
      } else {
        throw createError({ statusCode: 500, statusMessage: 'PasswordIncorrect', data: 'Your password is incorrect' })
      }
    } else {
      throw createError({ statusCode: 500, statusMessage: 'NoUserByEmail', data: 'There is no user found with this email adress' })
    }
  } catch (error) {
    sendError(res, error)
  }
}

const logoutUser = async (res: ServerResponse, db: Db, requestBody: RequestObject) => {
  try {
    await manageToken(db, 'delete', requestBody.data)
    setCookie(res, 'witherLoginToken', null, { path: '/' })
    send(res, JSON.stringify({
      message: 'UserLoggedOut'
    }))
  } catch (error) {
    sendError(res, error)
  }
}

const manageToken = (db: Db, method: string, param: any) => {
  garbageCollect(db)
  return method === 'set'
    ? setToken(db, param)
    : method === 'get'
      ? getToken(db, param)
      : deleteToken(db, param)
}

const registerUser = async (res: ServerResponse, db: Db, requestBody: RequestObject) => {
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
        throw createError({ statusCode: 500, statusMessage: 'UserNotInserted', data: 'User was not inserted' })
      }
    } else {
      throw createError({ statusCode: 500, statusMessage: 'UserAlreadyExists', data: 'User already exists' })
    }
  } catch (error) {
    sendError(res, error)
  }
}

const returnUser = async (res: ServerResponse, db: Db, requestBody: RequestObject) => {
  try {
    const token = await db.collection('tokens').findOne({ uuid: requestBody.data })
    if (token) {
      const user = await db.collection('users').findOne({ Email: token.user })
      if (user) {
        send(res, JSON.stringify({
          message: 'UserFound',
          user: user
        }))
      } else {
        throw createError({ statusCode: 500, statusMessage: 'UserNotFound', data: `User was not found with email ${requestBody.data.Email}` })
      }
    } else {
      throw createError({ statusCode: 500, statusMessage: 'TokenNotFound', data: `There was no token found to fetch a user with token id ${requestBody.data}` })
    }
  } catch (error) {
    sendError(res, error)
  }
}

const updateUser = (res: ServerResponse, db: Db, requestBody: RequestObject) => {
  try {

  } catch (error) {
    sendError(res, error)
  }
}

export {
  deleteUser,
  loginUser,
  logoutUser,
  manageToken,
  registerUser,
  returnUser,
  updateUser
}

const deleteToken = async (db: Db, tokenId) => {
  const deleteToken = await db.collection('tokens').deleteOne({ uuid: tokenId })
  return deleteToken.acknowledged
}

const garbageCollect = async (db: Db) => {
  const tokens = await db.collection('tokens').find({}).toArray()
  if (tokens.length) {
    for (const token of tokens) {
      const now = new Date()
      const twoHours = 10800000
      if (token.created < (now.getTime() - twoHours)) {
        deleteToken(db, token.uuid)
      }
    }
  }
}

const getToken = async (db: Db, tokenId) => {
  return await db.collection('tokens').findOne({ uuid: tokenId })
}

const insertUser = async (db: Db, requestBody: RequestObject): Promise<boolean> => {
  const user: UserForm = requestBody.data
  delete user.PasswordCheck
  const addUser = await db.collection('users').insertOne(user)
  return addUser.acknowledged
}

const setToken = async (db: Db, user: User): Promise<Token> => {
  const now = new Date()
  const token: Token = {
    uuid: createUUID(),
    user: user.Email,
    group: user.Group,
    created: now.getTime()
  }
  const setToken = await db.collection('tokens').insertOne(token)
  if (setToken.acknowledged) {
    return token
  }
}