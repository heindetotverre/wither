import { IncomingMessage, ServerResponse } from 'http'

export default (req : IncomingMessage, res : ServerResponse, next) => {
  console.log('check auth with db')
  next()
}