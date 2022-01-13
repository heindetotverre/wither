import { IncomingMessage, ServerResponse } from 'http'
import mongoConnect from '~~/server/api/db'
import { token } from '~~/server/api/db/controllers/users'
import { useCookie } from 'h3'

export default async (req: IncomingMessage, res: ServerResponse, next) => {
  const client = await mongoConnect(req, res)
  const cookie = useCookie(req, 'witherLoginToken') as any
  await token(res, client.db, 'get', cookie)
  next()
}