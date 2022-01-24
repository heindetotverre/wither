import { Db } from 'mongodb'
import { ServerResponse } from 'http'
import { createError, sendError, send } from 'h3'
import { RequestObject } from '~~/types'

const returnPages = async (res: ServerResponse, db: Db, requestBody: RequestObject) => {
  try {
    const pages = await db.collection('pages').find({}).toArray()
    if (pages.length) {
      send(res, JSON.stringify({
        message: 'PagesReturned',
        pages: pages
      }))
    }
    if (pages.length === 0) {
      send(res, JSON.stringify({
        message: 'NoPagesCreatedYet'
      }))
    } else {
      throw createError({ statusCode: 500, statusMessage: 'NoPagesOrEmptyPagesReturned', data: 'No pages were returned and no empty array of pages was returned' })
    }
  } catch (error) {
    sendError(res, error)
  }
}

const setPage = async (res: ServerResponse, db: Db, requestBody: RequestObject) => {
  try {

  } catch (error) {

  }
}

export {
  returnPages,
  setPage
}