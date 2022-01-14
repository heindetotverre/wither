import { Db } from 'mongodb'

const checkCollectionAndCreate = async (db: Db) => {
  const collections = await db.listCollections().toArray()
  const collectionNames = collections.map(c => c.name)
  if (!collectionNames.includes('users')) {
    await db.createCollection('users')
  }
  if (!collectionNames.includes('tokens')) {
    await db.createCollection('tokens')
  }
  if (!collectionNames.includes('pages')) {
    await db.createCollection('pages')
  }
}

export { checkCollectionAndCreate }