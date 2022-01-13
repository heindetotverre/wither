import { IncomingMessage, ServerResponse } from 'http'
import { useBody } from 'h3'
import mongoConnect from './db'
import { login, logout, register } from './db/controllers/users'
import { checkCollectionAndCreate } from './db/tools/checkCollectionAndCreate'

export default async (req: IncomingMessage, res: ServerResponse) => {
  const body = await useBody(req)
  const client = await mongoConnect(req, res)

  checkCollectionAndCreate(client.db, 'users')

  if (req.url === '/register') {
    await register(res, client.db, body)
  }

  if (req.url === '/login') {
    await login(res, client.db, body)
  }

  if (req.url === '/logout') {
    await logout(res, client.db, body)
  }
}