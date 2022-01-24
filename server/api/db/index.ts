import mongoose from 'mongoose'
import config from '#config'

let client

export default async () => {
  try {
    console.log('db connection string: ', config)
    await mongoose.connect('mongodb://127.0.0.1:27017/db')
    client = mongoose.connection
  } catch (error) {
    console.log(error)
  }

  return client
}