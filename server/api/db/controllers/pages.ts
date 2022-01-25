import { Db } from 'mongodb'
import { ServerResponse } from 'http'
import { createError, sendError, send } from 'h3'
import { RequestObject } from '~~/types'

const deletePage = async (res: ServerResponse, db: Db, requestBody: RequestObject) => {
  try {
    const pageId = requestBody.data
    const deletedPage = await db.collection('pages').deleteOne({ id: pageId })
    if (deletedPage.deletedCount) {
      send(res, JSON.stringify({
        message: 'PageDeleted'
      }))
    } else {
      throw createError({ statusCode: 500, statusMessage: 'PageNotDeleted', data: 'Page has not been deleted' })
    }
  } catch (error) {
    sendError(res, error)
  }
}

const returnPages = async (res: ServerResponse, db: Db) => {
  try {
    const pages = await db.collection('pages').find({}).toArray()
    if (!pages.length) {
      send(res, JSON.stringify({
        message: 'NoPagesCreatedYet',
        pages: []
      }))
    } else {
      send(res, JSON.stringify({
        message: 'PagesReturned',
        pages: pages
      }))
    }
    return pages
  } catch (error) {
    sendError(res, error)
  }
}

const setPage = async (res: ServerResponse, db: Db, requestBody: RequestObject) => {
  try {
    const page = requestBody.data
    const insertedPage = await db.collection('pages').insertOne(page)
    if (insertedPage) {
      send(res, JSON.stringify({
        message: 'PageInserted',
        page: page
      }))
    } else {
      throw createError({ statusCode: 500, statusMessage: 'PageNotInserted', data: 'Page was not inserted' })
    }
  } catch (error) {
    sendError(res, error)
  }
}

export {
  deletePage,
  returnPages,
  setPage
}