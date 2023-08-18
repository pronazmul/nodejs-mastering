import createHttpError from 'http-errors'

// Initialize Module
const ValidateMiddleware = {}

ValidateMiddleware.validateRequest = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body)
    next()
  } catch (error) {
    next(createHttpError(422, error))
  }
}

export default ValidateMiddleware
