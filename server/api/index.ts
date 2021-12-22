import { IncomingMessage, ServerResponse } from 'http'
import * as auth from './auth'

export default (req : IncomingMessage, res : ServerResponse) => {
  if (req.url === 'auth') {
    return auth
  }
}