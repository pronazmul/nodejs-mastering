import UserService from '../services/users.service.js'

const create = async (req, res, next) => {
  try {
    let data = req.body

    let result = await UserService.create(data)
    res.status(201).json({
      success: true,
      message: 'User Created Successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    })
  }
}

const findOne = async (req, res, next) => {
  try {
    let id = req.params.id
    let result = await UserService.findOne(id)
    res.status(201).json({
      success: true,
      message: 'Single User Retrived Success!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    })
  }
}

const findMany = async (req, res, next) => {
  try {
    let result = await UserService.findMany()
    res.status(200).json({
      success: true,
      message: 'User Data Fetch Success!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    })
  }
}
const deleteOne = (req, res, next) => {}
const updateOne = (req, res, next) => {}

const UserController = {
  create,
  findOne,
  findMany,
  deleteOne,
  updateOne,
}

export default UserController
