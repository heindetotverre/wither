import { IncomingMessage, ServerResponse } from 'http'
import mongoConnect from '~~/server/api/db'
import { manageToken } from '~~/server/api/db/controllers/users'
import { useCookie, setCookie } from 'h3'
import { Token } from '~~/types'

export default async (req: IncomingMessage, res: ServerResponse, next) => {
  const client = await mongoConnect()
  const cookie = useCookie(req, 'witherLoginToken') as any
  if (typeof cookie === 'string') {
    const tokenId = JSON.parse(cookie)?.id
    const token = await manageToken(client.db, 'get', tokenId) as Token
    if (!token) {
      setCookie(res, 'witherLoginToken', null, { path: '/' })
    } else {
      const now = new Date()
      const twoHours = 10800000
      if (token.created < (now.getTime() - twoHours)) {
        await manageToken(client.db, 'delete', token.uuid)
        setCookie(res, 'witherLoginToken', null, { path: '/' })
      }
    }
  }
  next()
}