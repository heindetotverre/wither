import mongoose from 'mongoose'
import config from '#config'

let client

export default async () => {
  try {
    await mongoose.connect(config.DB_LOCATION)
    client = mongoose.connection
  } catch (error) {
    console.log(error)
  }

  return client
}