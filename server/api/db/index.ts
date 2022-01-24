import mongoose from 'mongoose'
import config from '#config'

let client

export default async () => {
  try {
    console.log('db connection string: ', config.MONGO_URL)
    await mongoose.connect(config.MONGO_URL)
    client = mongoose.connection
  } catch (error) {
    console.log(error)
  }

  return client
}