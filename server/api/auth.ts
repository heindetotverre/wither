import { IncomingMessage, ServerResponse } from 'http'
import { useBody } from 'h3'

export default async (req : IncomingMessage, res : ServerResponse) => {
  const body = await useBody(req)

  return {
    request: `login with ${body}`,
    result: `this is an auth function triggered with email: ${body.data.Email}, password: ${body.data.Password}`
  }
}