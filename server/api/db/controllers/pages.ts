import { Db } from 'mongodb'
import { ServerResponse } from 'http'
import { createError, sendError, send } from 'h3'
import { RequestObject } from '~~/types'

const getPages = async (res: ServerResponse, db: Db, requestBody: RequestObject) => {

}

const setPage = async (res: ServerResponse, db: Db, requestBody: RequestObject) => {

}

export {
  getPages,
  setPage
}