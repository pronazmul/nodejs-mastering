import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import dotenv from 'dotenv'

// SERVER INITILIZATION
dotenv.config()
const app = express()

// GLOBAL MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json())

//DATABSE SCHEMA & MODEL
const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    profession: { type: String },
  },
  { timestamps: true, versionKey: false }
)
const UserModel = mongoose.model('user', UserSchema)

// Routes Handling
app.get('/users', async (req, res) => {
  try {
    let data = await UserModel.find()
    if (data?.length) {
      res.status(200).json({
        success: true,
        message: 'User Fetch Success!',
        data: data,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'No Data Found!',
        data: null,
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed To Fetch Data!',
      data: null,
    })
  }
})

app.post('/users', async (req, res) => {
  try {
    let data = req.body
    let result = await UserModel.create(data)

    res.status(201).json({
      success: true,
      message: 'User Crated Successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed To insert Data',
      data: null,
    })
  }
})

app.get('/users/:id', async (req, res) => {
  try {
    let id = req.params.id
    let result = await UserModel.find({ _id: id })
    res.status(200).json({
      success: true,
      message: 'User FEtch Success!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed To fetch Single Data BY iD',
      data: null,
    })
  }
})

app.put('/users/:id', async (req, res) => {
  try {
    let query = { _id: req.params.id }
    let updatedData = req.body
    let options = { new: true }

    let result = await UserModel.findOneAndUpdate(query, updatedData, options)
    res.status(200).json({
      success: true,
      message: 'User Update Success!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed To Update User',
      data: null,
    })
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    let id = req.params.id
    let result = await UserModel.findOneAndDelete({ _id: id })
    res.status(200).json({
      success: true,
      message: 'User Delete Success!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed To Deletes',
      data: null,
    })
  }
})

// DATABASE CONNETIONS
const DBConnection = async () => {
  try {
    mongoose.set('strictQuery', true)

    const OPTIONS = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    await mongoose.connect(process.env.DATABASE_URL, OPTIONS)
    console.log(
      `MongoDB Successfully Connected with ${mongoose.connection.name}`
    )
  } catch (error) {
    console.log(`DB Connection Failed!`)
    process.exit(1)
  }
}
DBConnection()

// SERVER LISTENING
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`)
})
