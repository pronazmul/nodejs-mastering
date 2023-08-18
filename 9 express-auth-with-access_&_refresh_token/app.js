import express from 'express'
import config from './src/config/index.js'
import connectDB from './src/config/db.js'
import GlobalMiddleware from './src/middlewares/global.middleware.js'
import routes from './src/routes/index.js'

const app = express()

// Connect to Database
connectDB()

// Applying Global Middlewares
app.use(GlobalMiddleware.middlewares)

// Application Routes
app.use(routes)

// Apply Not Found && Error Middleware
app.use([GlobalMiddleware.notFound, GlobalMiddleware.errorHandler])

app.listen(config.port, () => {
  console.log(`SERVER IS LISTENING ON ${config.port} PORT`)
})
