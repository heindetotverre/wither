import { Db } from 'mongodb'
import { ServerResponse } from 'http'
import { createError, sendError, send } from 'h3'
import { RequestObject } from '~~/types'
import { checkCollectionAndCreate } from '../tools/checkCollectionAndCreate'

const getPages = async (res: ServerResponse, db: Db, requestBody: RequestObject) => {

}

export {
  getPages
}