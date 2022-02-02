import { IncomingMessage, ServerResponse } from 'http'
import { useBody, setCookie } from 'h3'

export default async (req: IncomingMessage, res: ServerResponse) => {
  const body = await useBody(req)
  const name = 'witherLoginToken'
  const value = JSON.stringify({ id: body.secret })
  if (body.set) {
    setCookie(res, name, value, { path: '/' })
  } else {
    setCookie(res, name, '', { path: '/' })
  }
  return 'authenticated'
}