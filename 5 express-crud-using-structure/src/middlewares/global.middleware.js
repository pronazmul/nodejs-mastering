import morgan, { token } from 'morgan'
import { json, urlencoded } from 'express'

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

export default GlobalMiddleware
