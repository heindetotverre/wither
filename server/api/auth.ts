import { IncomingMessage, ServerResponse } from 'http'
import { useBody } from 'h3'
import mongoConnect from './db'
import { login, register } from './db/controllers/users'

export default async (req : IncomingMessage, res : ServerResponse) => {
  const body = await useBody(req)
  const client = await mongoConnect(req, res)

  const collections = await client.db.listCollections().toArray()
  const collectionNames = collections.map(c => c.name)
  if (!collectionNames.includes('users')) {
    await client.db.createCollection('users')
  }

  if (req.url.includes('register')) {
    return register(client.db, body)
  }

  if (req.url.includes('login')) {
    return login(client.db, body)
  }
}