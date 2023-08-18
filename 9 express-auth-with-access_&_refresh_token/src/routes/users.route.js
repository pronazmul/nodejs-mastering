// External Modules:
import { Router } from 'express'

import UserController from '../controllers/users.controller.js'
import AuthMiddleware from '../middlewares/auth.middleware.js'

const router = Router()

/**
 * @description Retrive Single User Info By UserID
 * @Route [GET]- /users/:userID
 * @Access protected - [admin]
 * @returns {Object} - Single User Object
 */
router.get('/:id', UserController.findOne)

/**
 * @description Update user By UserID
 * @Route [PUT]- /users/:userID
 * @Access protected - [user, admin]
 * @returns {Object} - Updated User.
 */
router.put('/:id', UserController.updateOne)

/**
 * @description Delete User By UserID
 * @Route [DELETE]- /users/:userID
 * @Access protected - [admin]
 * @returns {Object} - Deleted Status.
 */
router.delete('/:id', UserController.deleteOne)

/**
 * @description Retrive All Users
 * @Route [GET]- /users
 * @Access protected - [admin]
 * @returns {Array} - All User Array.
 */
router.get('/', AuthMiddleware.authenticate, UserController.findMany)

/**
 * @description REGISTER
 * @Route [POST]- /users
 * @Access protected - [admin]
 * @returns {Array} - Created User Object.
 */
router.post('/', UserController.create)

// Exports
export default router
