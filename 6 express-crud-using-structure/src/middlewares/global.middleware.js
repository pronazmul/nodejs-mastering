import morgan, { token } from 'morgan'
import { json, urlencoded } from 'express'
import config from '../config/index.js'
import createHttpError from 'http-errors'

const GlobalMiddleware = {}

// Format Morgan Looger
token('timestamp', () => {
  let day = new Date().toDateString()
  let timestamp = new Date().toLocaleTimeString()
  return `${day}- ${timestamp}`
})

const logFormat =
  ':timestamp :method :url :status :res[content-length] - :response-time ms'

GlobalMiddleware.middlewares = [
  morgan(logFormat),
  json(),
  urlencoded({ extended: false }),
]

GlobalMiddleware.notFound = (req, res, next) => {
  next(createHttpError(404, `Not Found - ${req.originalUrl}`))
}

GlobalMiddleware.errorHandler = (error, req, res, next) => {
  let status = error?.status || 500
  let message = error?.message || 'Something Went Wrong!'
  let errors = []
  let stack = error?.stack || ''

  if (config.env === 'production') {
    res.status(status).json({
      success: false,
      message: message,
      data: null,
      errors,
    })
  } else {
    res.status(status).json({
      success: false,
      message: message,
      data: null,
      errors,
      stack,
    })
  }
}

export default GlobalMiddleware
