import mongoose from 'mongoose'

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
