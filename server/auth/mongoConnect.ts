import mongoose from 'mongoose'
import config from '#config'

export default async () => {
  try {
    await mongoose.connect(config.DB_LOCATION)
  } catch (error) {
    console.log(error)
  }
  return mongoose.connection
}