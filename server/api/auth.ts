import { IncomingMessage, ServerResponse } from 'http'
import { useBody } from 'h3'
import mongoConnect from './db'
import { loginUser, logoutUser, registerUser } from './db/controllers/users'
import { checkCollectionAndCreate } from './db/tools/checkCollectionAndCreate'

export default async (req: IncomingMessage, res: ServerResponse) => {
  const body = await useBody(req)
  const client = await mongoConnect()

  checkCollectionAndCreate(client.db, 'users')

  if (req.url === '/auth/loginUser') {
    await loginUser(res, client.db, body)
  }

  if (req.url === '/auth/logoutUser') {
    await logoutUser(res, client.db, body)
  }

  if (req.url === '/auth/registerUser') {
    await registerUser(res, client.db, body)
  }
}