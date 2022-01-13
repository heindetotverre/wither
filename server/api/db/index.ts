import { IncomingMessage, ServerResponse } from 'http'
import mongoose from 'mongoose'

let client

export default async (req: IncomingMessage, res: ServerResponse) => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/db')
    client = mongoose.connection
  } catch (error) {
    console.log(error)
  }

  return client
}