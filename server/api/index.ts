import { IncomingMessage, ServerResponse } from 'http'
import { useBody } from 'h3'
import mongoConnect from './db'
import { loginUser, logoutUser, registerUser, returnUser, updateUser } from './db/controllers/users'
import { getPages } from './db/controllers/pages'
import { checkCollectionAndCreate } from './db/tools/checkCollectionAndCreate'

export default async (req: IncomingMessage, res: ServerResponse) => {
  const body = await useBody(req)
  const client = await mongoConnect()

  checkCollectionAndCreate(client.db)

  if (req.url === '/auth/loginUser') {
    await loginUser(res, client.db, body)
  }
  if (req.url === '/auth/logoutUser') {
    await logoutUser(res, client.db, body)
  }
  if (req.url === '/auth/registerUser') {
    await registerUser(res, client.db, body)
  }

  if (req.url === '/user/getUser') {
    await returnUser(res, client.db, body)
  }
  if (req.url === '/user/updateUser') {
    await returnUser(res, client.db, body)
  }

  if (req.url === '/pages/getPages') {
    await getPages(res, client.db, body)
  }
}