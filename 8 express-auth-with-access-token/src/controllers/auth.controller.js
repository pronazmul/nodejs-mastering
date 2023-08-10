import UserService from '../services/users.service.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/index.js'

const AuthController = {}

AuthController.register = async (req, res, next) => {
  try {
    let data = req.body
    data.password = await bcrypt.hash(data.password, 10)
    let result = await UserService.register(data)
    res.status(201).json({
      success: true,
      message: 'Registration Success!',
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

AuthController.login = async (req, res, next) => {
  try {
    let { username, password } = req.body

    let result = await UserService.login(username, password)

    let token = jwt.sign(result, config.jwt_secret, {
      expiresIn: config.jwt_expire_time,
    })

    res.cookie('accessToken', token, {
      maxAge: config.jwt_expire_time,
      httpOnly: true,
    })

    res.status(201).json({
      success: true,
      message: 'User Successfully Logged In!',
      data: { ...result },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    })
  }
}

export default AuthController
