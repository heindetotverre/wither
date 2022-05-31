import { env } from 'process';
import mongoose from 'mongoose'

const mongoUrl = env.MONGO_URL || 'mongodb://127.0.0.1:27017/db' as string

export default async () => {
  try {
    await mongoose.connect(mongoUrl)
  } catch (error) {
    console.log(error)
    return
  }
  return mongoose.connection
}