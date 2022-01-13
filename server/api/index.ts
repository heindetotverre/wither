import { IncomingMessage, ServerResponse } from 'http'
import auth from './auth'

export default async (req : IncomingMessage, res : ServerResponse) => {
  if (req.url.includes('auth')) {
    await auth(req, res)
  }
}