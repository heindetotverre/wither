import { IncomingMessage, ServerResponse } from 'http'

import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'

let client

export default async (req : IncomingMessage, res : ServerResponse) => {
  try {
    MongoClient.connect("mongodb://localhost:27017/db", (err, db) => {
      if (err)  {
        throw err
      }  
    })
    
    await mongoose.connect('mongodb://localhost:27017/db')
    client = mongoose.connection
  } catch (error) {
    console.log(error);
  }

  return client
}