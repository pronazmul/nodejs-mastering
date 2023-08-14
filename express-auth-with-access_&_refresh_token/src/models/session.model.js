import { Schema, Types, model } from 'mongoose'

const sessionSchema = Schema(
  {
    user: { type: Types.ObjectId, ref: 'user', required: true },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  { timestamps: true, versionKey: false }
)
const SessionModel = model('session', sessionSchema)

export default SessionModel
