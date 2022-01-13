import { IncomingMessage, ServerResponse } from 'http'
import mongoConnect from '~~/server/api/db'
import { token } from '~~/server/api/db/controllers/users'
import { setCookie } from 'h3'

export default async (req: IncomingMessage, res: ServerResponse, next) => {
  const client = await mongoConnect(req, res)
  const tokenResponse : boolean = await token(res, client.db, 'checkForToken')
  setCookie(res, 'witherHasLoginToken', JSON.stringify(tokenResponse))
  next()
}