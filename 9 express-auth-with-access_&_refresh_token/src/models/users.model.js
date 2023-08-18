import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const UserModel = mongoose.model('user', userSchema)

export default UserModel
