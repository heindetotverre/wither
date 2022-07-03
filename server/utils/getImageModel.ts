import mongoose from 'mongoose'
import {} from 'dotenv'

mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/db' as string)
const { model } = mongoose
const imageSchema = new mongoose.Schema({
  fileName: String,
  fileType: String,
  id: String,
  uploadDate: Number,
  img: {
    data: Buffer,
    contentType: String
  }
})

export default model('Images', imageSchema)
