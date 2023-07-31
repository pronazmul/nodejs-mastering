import UserModel from '../models/users.model.js'

const create = async (data) => {
  try {
    let result = await UserModel.create(data)
    return result
  } catch (error) {
    throw new Error('Failed To Insert Data')
  }
}

const findOne = async (id) => {
  try {
    let result = await UserModel.findOne({ _id: id })
    return result
  } catch (error) {
    throw new Error('Failed To Retirve DAta By Id')
  }
}
const findMany = () => {}
const deleteOne = () => {}
const updateOne = () => {}

const UserService = {
  create,
  findOne,
  findMany,
  deleteOne,
  updateOne,
}

export default UserService
