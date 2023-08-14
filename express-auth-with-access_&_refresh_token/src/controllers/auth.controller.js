import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/index.js'
import AuthService from '../services/auth.service.js'

const AuthController = {}

AuthController.register = async (req, res, next) => {
  try {
    let data = req.body
    data.password = await bcrypt.hash(data.password, 10)
    let result = await AuthService.register(data)
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

    let result = await AuthService.login(username, password)

    let session = await AuthService.createSession(result._id, 'Postman')

    let accessToken = jwt.sign(
      { ...result, session: session._id },
      config.jwt_secret,
      {
        expiresIn: config.access_token,
      }
    )

    let refreshToken = jwt.sign({ session: session._id }, config.jwt_secret, {
      expiresIn: config.refresh_token,
    })

    res.cookie('accessToken', accessToken, {
      maxAge: config.access_token,
      httpOnly: true,
    })

    res.cookie('refreshToken', refreshToken, {
      maxAge: config.refresh_token,
      httpOnly: true,
    })

    res.status(201).json({
      success: true,
      message: 'User Successfully Logged In!',
      data: { session, result },
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
