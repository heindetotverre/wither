import { IncomingMessage, ServerResponse } from 'http'
import { useBody, setCookie } from 'h3'

export default async (req: IncomingMessage, res: ServerResponse) => {
  const body = await useBody(req)
  const name = 'witherLoginToken'
  const value = JSON.stringify({ id: body.secret })
  setCookie(res, name, value)
  return 'authenticated'
}