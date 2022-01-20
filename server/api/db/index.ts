import mongoose from 'mongoose'

let client

export default async () => {
  try {
    await mongoose.connect('mongodb://db:722a35408a65551e8abcd96f94f4d544@dokku-mongo-db:27017/db')
    client = mongoose.connection
  } catch (error) {
    console.log(error)
  }

  return client
}