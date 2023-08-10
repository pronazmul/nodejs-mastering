import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import config from './../config/index.js'

// Initialize Module
const AuthMiddleware = {}

AuthMiddleware.authenticate = async (req, res, next) => {
  try {
    if (req?.headers?.authorization) {
      let token = req.headers.authorization
      jwt.verify(token, config.jwt_secret)

      next()
    } else {
      next(createHttpError(401, 'Authentication Failed!'))
    }
  } catch (error) {
    next(createHttpError(401, 'Authentication Failed!'))
  }
}

export default AuthMiddleware
