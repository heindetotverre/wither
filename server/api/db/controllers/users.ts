import { Db } from 'mongodb'
import { ServerResponse } from 'http'
import { createError, sendError, send, setCookie } from 'h3'
import { UserForm, RequestObject, Token } from '~~/types'
import { createUUID } from '~~/utils'
import { checkCollectionAndCreate } from '../tools/checkCollectionAndCreate'

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

const login = async (res : ServerResponse, db : Db, requestBody : RequestObject) => {
  try {
    const userByEmail = await db.collection('users').findOne({ Email: requestBody.data.Email })
    if (userByEmail) {
      if (userByEmail.Password === requestBody.data.Password) {
        const createdToken = await token(res, db, 'set', requestBody.data.Email)
        setCookie(res, 'witherLoginToken', JSON.stringify({ id: createdToken.uuid }), { path: '/' })
        send(res, JSON.stringify({
          message: 'UserLoggedIn',
          token: createdToken,
          user: userByEmail
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
  return 'logged is triggered'
}

const logout = async (res : ServerResponse, db : Db, requestBody : RequestObject) => {
  await db.collection('tokens').deleteOne({ uuid: requestBody.data.uuid })
  setCookie(res, 'witherLoginToken', null, { path: '/' })
  send(res, JSON.stringify({
    message: 'UserLoggedOut'
  }))
}

const update = (res, db, requestBody) => {
  return 'logged is triggered'
}

const token = (res : ServerResponse, db : Db, method : string, param : string | void) => {
  checkCollectionAndCreate(db, 'tokens')
  return method === 'set'
    ? setToken(res, db, param,)
    : getToken(db, param)
}

export {
  login,
  logout,
  register,
  token,
  update
}

const getToken = async (db : Db, tokenFromCookie) => {
  if (tokenFromCookie) {
    const parsedToken = JSON.parse(tokenFromCookie)
    const tokenId = parsedToken?.id
    if (tokenId) {
      const token = (await db.collection('tokens').findOne({ uuid: tokenId }))
      return token
    }
  }
}

const insertUser = async (db: Db, requestBody : RequestObject) : Promise<boolean> => {
  const user : UserForm = requestBody.data
  delete user.PasswordCheck
  const addUser = await db.collection('users').insertOne(user)
  return addUser.acknowledged
}

const setToken = async (res : ServerResponse, db : Db, userMail : string | void) : Promise<Token> => {
  if (userMail) {
    const token : Token = {
      uuid: createUUID(),
      user: userMail,
      group: 'default',
      created: new Date()
    }
    await db.collection('tokens').insertOne(token)
    return token
  }
}