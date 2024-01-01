const logger = require('./logger')
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const requestLogger =
    (request, response, next) => {
      logger.info('Method:', request.method)
      logger.info('Path:  ', request.path)
      logger.info('Body:  ', request.body)
      logger.info('---')
      next()
    }

const unknownEndpoint =
    (request, response) => {
      response.status(404).send({error: `unknown endpoint ${request.path}`})
    }

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
};

// 4.20 refactor to get Token
const tokenExtractor = (request, response, next) => {
  const token = getTokenFrom(request);
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      request.decodedToken = decodedToken;
    } catch (error) {
      return response.status(401).json({error: 'Token invalid'});
    }
  }
  next();
};

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// 4.2 add new userExtractor middleware
const userExtractor = async (request, response, next) => {
  const decodedToken = request.decodedToken;
  try {
    if (decodedToken && decodedToken.id) {
      const user = await User.findById(decodedToken.id);
      console.log('>> user', user)
      if (!user) {
        console.log('>> user go invalid', user)
        return response.status(401).json({error: 'Token invalid'});
      }

      request.user = user;
    }
  } catch (error) {
    return response.status(401).json({error: 'Token invalid'});
  }

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}