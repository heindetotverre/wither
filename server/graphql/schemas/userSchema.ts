import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
  FirstName: {
    type: String
  },
  LastName: {
    type: String
  },
  Email: {
    type: String
  },
  Password: {
    type: String
  },
  Group: {
    type: String
  }
})