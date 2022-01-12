import { IncomingMessage, ServerResponse } from 'http'

import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'

let client

export default async (req: IncomingMessage, res: ServerResponse) => {
  try {
    await mongoose.connect('mongodb://localhost:27017/db')
    console.log(mongoose)

    client = mongoose.connection

    console.log(client)
  } catch (error) {
    console.log(error);
  }

  return client
}