/**
 * @fileoverview Auth handler middleware 
 * @author {author} dlrivada <{dlrivada@hotmail.com}> ({http://dlrivada.com})
 * @module middlewares/auth.handler 
 * @requires @hapi/boom
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * const authHandler = require('./middlewares/auth.handler');
 * router.get('/', authHandler.checkApiKey, usersController.getUsers);
 * @see {@link https://www.npmjs.com/package/@hapi/boom| @hapi/boom}
 * @see {@link https://www.npmjs.com/package/joi| joi}
 * @see {@link https://www.npmjs.com/package/joi#validation-api| joi validation api}
 * @see {@link https://www.npmjs.com/package/joi#anyvalidatevalue-options| joi any.validate(value, [options])}
 * @see {@link https://www.npmjs.com/package/joi#errors| joi errors} 
 */

const boom = require('@hapi/boom');
const jwt = require("jsonwebtoken");
const { config } = require('./../config/config');

const { TokenExpiredError } = jwt;

const catchError = (err, res, next) => {
  if (err instanceof TokenExpiredError) {
    next(boom.unauthorized("Unauthorized! Access Token was expired!"));
  }
  next(boom.unauthorized("Unauthorized!"));
}

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    next(boom.unauthorized("Unauthorized! No token provided!"));
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      catchError(err, res, next);
    }
    if (!decoded) {
      next(boom.unauthorized("Unauthorized!"));
    }
    if (!decoded.sub) {
      next(boom.unauthorized("Unauthorized!"));
    }
    if (decoded.oneTimeToken) {
      next(boom.unauthorized("Unauthorized! One time token!"));
    }
    req.userId = decoded.sub;
    next();
  });
};

/**
 * @function checkApiKey - Middleware to check the api key in the request headers 
 * @name checkApiKey 
 * @description 
 * This function is a middleware that checks the api key in the request headers.
 * If the api key is valid, the next middleware is called.
 * If the api key is invalid, an error is thrown.
 * @returns {function} - Middleware function
 * @throws {object} - Boom error
 * @example
 * const authHandler = require('./middlewares/auth.handler');
 * router.get('/', authHandler.checkApiKey, usersController.getUsers);
 * @version 1.0.0
 * @since 1.0.0
 * @memberof module:middlewares/auth.handler
 * @see {@link https://www.npmjs.com/package/@hapi/boom| @hapi/boom}
 * @see {@link https://www.npmjs.com/package/joi| joi}
 * @see {@link https://www.npmjs.com/package/joi#validation-api| joi validation api}
 * @see {@link https://www.npmjs.com/package/joi#anyvalidatevalue-options| joi any.validate(value, [options])}
 * @see {@link https://www.npmjs.com/package/joi#errors| joi errors}
 */
function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

module.exports = { checkApiKey, verifyToken }