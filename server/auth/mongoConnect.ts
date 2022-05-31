import { env } from 'process';
import mongoose from 'mongoose'

export default async () => {
  try {
    await mongoose.connect(env.MONGO_URL as string)
  } catch (error) {
    console.log(error)
  }
  return mongoose.connection
}