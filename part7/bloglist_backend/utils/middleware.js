const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require("../models/user");

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

// Extract the token from the Authorization header and attach it to the response
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '') // Assign token to request.token field
  } else {
    request.token = null // Assign null if no token is found
  }
  next()
}

// Extract the user associated to the token
const userExtractor = async (request, response, next) => {
  if (!request.token) {
    request.user = null // No token provided
    return next() // skip further processing
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  // console.log('MIDDLEWARE', user)

  if (decodedToken.id) {
    request.user = user // Assign the user id to the request
  } else {
    request.user = null // Assign null if no user is found
  }
  next()
}

module.exports = { requestLogger, tokenExtractor, userExtractor }