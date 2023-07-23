import { Router } from 'express'
import userRoutes from './users.route.js'

const router = Router()

//Health Checker
router.use('/health', (req, res) => res.status(200).json({ status: 'ok' }))

// Application Routes
router.use('/users', userRoutes)

// Module Exports
export default router
