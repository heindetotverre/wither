import { IncomingMessage, ServerResponse } from 'http'
import { useBody } from 'h3'
import mongoConnect from './db'
import { deleteUser, loginUser, logoutUser, registerUser, returnUser, updateUser } from './db/controllers/users'
import { returnPages, setPage } from './db/controllers/pages'
import { checkCollectionAndCreate } from './db/tools/checkCollectionAndCreate'

export default async (req: IncomingMessage, res: ServerResponse) => {
  const body = await useBody(req)
  const client = await mongoConnect()

  checkCollectionAndCreate(client.db)

  console.log('api request url: ', req.url)

  if (req.url === '/auth/loginUser') {
    await loginUser(res, client.db, body)
  }
  if (req.url === '/auth/logoutUser') {
    await logoutUser(res, client.db, body)
  }
  if (req.url === '/auth/registerUser') {
    await registerUser(res, client.db, body)
  }

  if (req.url === '/user/deleteUser') {
    await deleteUser(res, client.db, body)
  }
  if (req.url === '/user/getUser') {
    await returnUser(res, client.db, body)
  }
  if (req.url === '/user/updateUser') {
    await updateUser(res, client.db, body)
  }

  if (req.url === '/pages/getPages') {
    await returnPages(res, client.db, body)
  }
  if (req.url === '/pages/setPage') {
    await setPage(res, client.db, body)
  }

  await client.close()
}