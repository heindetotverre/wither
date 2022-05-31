import { IncomingMessage, ServerResponse } from 'http'
import mongoConnect from '~~/server/auth/mongoConnect'
import { useCookie, setCookie, sendRedirect } from 'h3'

export default async (req: IncomingMessage, res: ServerResponse, next: Function) => {
  const client = await mongoConnect(),
    cookie = useCookie(req, 'witherLoginToken') as any

  if (!client) {
    next()
  }

  let redirect
  if (cookie) {
    const tokenId = JSON.parse(cookie)?.id
    const token = await client.db.collection('tokens').findOne({ id: tokenId })
    if (!token) {
      setCookie(res, 'witherLoginToken', '', { path: '/' })
      redirect = true
    } else {
      const now = new Date()
      const twoHours = 10800000
      if (token.created < (now.getTime() - twoHours)) {
        await client.db.collection('tokens').findOneAndDelete({ id: tokenId })
        setCookie(res, 'witherLoginToken', '', { path: '/' })
        redirect = true
      }
    }
  } else {
    redirect = true
  }
  if (redirect && req.url?.includes('admin') && req.url !== '/admin/login') {
    await sendRedirect(res, '/admin/login')
  }
  next()
}