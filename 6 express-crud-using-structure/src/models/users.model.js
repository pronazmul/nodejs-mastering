import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  email: { type: String, required: true },
})

const UserModel = mongoose.model('user', userSchema)

export default UserModel
