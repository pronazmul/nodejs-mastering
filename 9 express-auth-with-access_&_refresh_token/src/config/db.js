import mongoose from 'mongoose'
import config from './index.js'

mongoose.set('strictQuery', true)

const connectDB = async () => {
  try {
    const OPTIONS = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    await mongoose.connect(config.database_url, OPTIONS)
    console.log(
      `MongoDB Successfully Connected with ${mongoose.connection.name}`
    )
  } catch (error) {
    console.log(`Error ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
