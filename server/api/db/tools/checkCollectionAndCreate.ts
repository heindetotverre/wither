import { Db } from 'mongodb'

const checkCollectionAndCreate = async (db : Db, collection : string) => {
  const collections = await db.listCollections().toArray()
  const collectionNames = collections.map(c => c.name)
  if (!collectionNames.includes(collection)) {
    await db.createCollection(collection)
  }
}

export { checkCollectionAndCreate }