import { IncomingMessage, ServerResponse } from 'http'
import auth from './auth'

export default async (req : IncomingMessage, res : ServerResponse) => {
  try {
    if (req.url.includes('auth')) {
      return auth(req, res)
    }
  } catch (error) {
    return error
  }
}