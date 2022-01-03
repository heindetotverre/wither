import { IncomingMessage, ServerResponse } from 'http'

export default (req : IncomingMessage, res : ServerResponse) => {
  return {
    request: 'login',
    result: 'this is an auth function'
  }
}