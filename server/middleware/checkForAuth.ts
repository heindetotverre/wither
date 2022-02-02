import { IncomingMessage, ServerResponse } from 'http'
import mongoConnect from '~~/server/auth/mongoConnect'
import { useCookie, setCookie } from 'h3'

export default async (req: IncomingMessage, res: ServerResponse, next) => {
  const client = await mongoConnect()
  const cookie = useCookie(req, 'witherLoginToken') as any
  if (typeof cookie === 'string') {
    const tokenId = JSON.parse(cookie)?.id
    const token = await client.db.collection('tokens').findOne({ id: tokenId })
    if (!token) {
      setCookie(res, 'witherLoginToken', null, { path: '/' })
    } else {
      const now = new Date()
      const twoHours = 10800000
      if (token.created < (now.getTime() - twoHours)) {
        await client.db.collection('tokens').findOneAndDelete({ id: tokenId })
        setCookie(res, 'witherLoginToken', null, { path: '/' })
      }
    }
  }
  next()
}