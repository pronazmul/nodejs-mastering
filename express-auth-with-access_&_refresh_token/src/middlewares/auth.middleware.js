import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import config from './../config/index.js'
import AuthService from '../services/auth.service.js'

// Initialize Module
const AuthMiddleware = {}

AuthMiddleware.authenticate = async (req, res, next) => {
  try {
    let { accessToken, refreshToken } = req.cookies

    if (accessToken) {
      let decoded = jwt.verify(accessToken, config.jwt_secret)
      req.user = decoded
      next()
      return
    }

    if (!accessToken && refreshToken) {
      let decodedRef = jwt.verify(refreshToken, config.jwt_secret)
      let session = await AuthService.checkSession(decodedRef.session)
      let { user, _id } = session

      req.user = { ...user, session: _id }

      let access = jwt.sign({ ...user, session: _id }, config.jwt_secret, {
        expiresIn: config.access_token,
      })

      let refresh = jwt.sign({ session: _id }, config.jwt_secret, {
        expiresIn: config.refresh_token,
      })

      res.cookie('accessToken', access, {
        maxAge: config.access_token,
        httpOnly: true,
      })

      res.cookie('refreshToken', refresh, {
        maxAge: config.refresh_token,
        httpOnly: true,
      })

      next()
      return
    }

    next(createHttpError(401, 'Authentication Failed!'))
  } catch (error) {
    console.log({ error })
    next(createHttpError(401, 'Authentication Failed!'))
  }
}

export default AuthMiddleware
