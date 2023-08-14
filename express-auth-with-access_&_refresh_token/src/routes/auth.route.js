// External Modules:
import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'

const router = Router()

/**
 * @description Login
 * @Route [POST]- /users/login
 * @Access protected - [admin]
 * @returns {Array} - Created User Object.
 */
router.post('/login', AuthController.login)

/**
 * @description REGISTER
 * @Route [POST]- /users/register
 * @Access protected - [admin]
 * @returns {Array} - Created User Object.
 */
router.post('/register', AuthController.register)

// Exports
export default router
