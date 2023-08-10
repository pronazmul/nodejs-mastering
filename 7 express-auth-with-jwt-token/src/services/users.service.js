import UserModel from '../models/users.model.js'
import bcrypt from 'bcrypt'

const UserService = {}

UserService.register = async (data) => {
  try {
    let result = await UserModel.create(data)
    return result
  } catch (error) {
    throw new Error('Failed to Register!')
  }
}

UserService.login = async (username, password) => {
  try {
    let user = await UserModel.findOne({ username })
    if (!user) throw new Error('User Not Fond!')

    let matchPass = await bcrypt.compare(password, user.password)

    if (matchPass) return { username: user.username, name: user.name }

    throw new Error('password NOt matched!')
  } catch (error) {
    throw new Error('Failed To Login')
  }
}

UserService.findOne = async (id) => {
  try {
    let result = await UserModel.findOne({ _id: id })
    return result
  } catch (error) {
    throw new Error('Failed To Retirve DAta By Id')
  }
}

UserService.findMany = async () => {
  try {
    let result = await UserModel.find()
    return result
  } catch (error) {
    throw new Error('Failed to Fetch')
  }
}

UserService.deleteOne = () => {}
UserService.updateOne = () => {}

export default UserService
