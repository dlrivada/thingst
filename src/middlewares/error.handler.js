/**
 * @fileoverview Error handler middleware
 * @author {author} dlrivada <{dlrivada@hotmail.com}> ({http://dlrivada.com})
 * @module middlewares/error.handler 
 * @requires @hapi/boom
 * @requires sequelize
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
 * app.use(logErrors);
 * app.use(boomErrorHandler);
 * app.use(ormErrorHandler);
 * app.use(errorHandler);
 * @see {@link https://www.npmjs.com/package/@hapi/boom}
 * @see {@link https://www.npmjs.com/package/sequelize}
 * @see {@link https://www.npmjs.com/package/sequelize#errors}
 * @see {@link https://www.npmjs.com/package/sequelize#validationerror}
 * @see {@link https://www.npmjs.com/package/sequelize#uniqueconstrainterror}
 * @see {@link https://www.npmjs.com/package/sequelize#foreignkeyconstrainterror}
 * @see {@link https://www.npmjs.com/package/sequelize#exclusionconstrainterror}
 * @see {@link https://www.npmjs.com/package/sequelize#connectionacquiretimeouterror}
 * @see {@link https://www.npmjs.com/package/sequelize#connectionrefusederror}
 * @see {@link https://www.npmjs.com/package/sequelize#connectiontimedouterror}
 * @see {@link https://www.npmjs.com/package/sequelize#hostnotfounderror}
 * @see {@link https://www.npmjs.com/package/sequelize#hostnotreachableerror}
 * @see {@link https://www.npmjs.com/package/sequelize#invalidconnectionerror}
 * @see {@link https://www.npmjs.com/package/sequelize#connectionerror}
 * @see {@link https://www.npmjs.com/package/sequelize#connectionurierror}
 * @see {@link https://www.npmjs.com/package/sequelize#accessdeniederror}
 * @see {@link https://www.npmjs.com/package/sequelize#emptyresulterror}
 * @see {@link https://www.npmjs.com/package/sequelize#databaseerror}
 * @see {@link https://www.npmjs.com/package/sequelize#databaseconnectionerror}
 * @see {@link https://www.npmjs.com/package/sequelize#transactionerror}
 * @see {@link https://www.npmjs.com/package/sequelize#timeouterror}
 * @see {@link https://www.npmjs.com/package/sequelize#versionerror}
 * @see {@link https://www.npmjs.com/package/sequelize#baseerror}
 * @see {@link https://www.npmjs.com/package/sequelize#errorexception}
 * @see {@link https://www.npmjs.com/package/sequelize#options}
 * @see {@link https://www.npmjs.com/package/sequelize#query-interface}
 */

const { ValidationError } = require('sequelize');
const boom = require('@hapi/boom');

/**
 * @function logErrors 
 * @description Log errors
 * @param {object} err - Error object
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next middleware function
 * @returns {function} - Next middleware function
 * @version 1.0.0
 * @since 1.0.0
 * @memberof module:middlewares/error.handler
 * @example
 * const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
 * app.use(logErrors);
 */
// eslint-disable-next-line no-unused-vars
function logErrors (err, req, res, next) {
  console.error(err);
  next(err);
}

/**
 * @function errorHandler
 * @description Error handler
 * @param {object} err - Error object
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next middleware function
 * @returns {object} - Response object
 * @version 1.0.0
 * @since 1.0.0
 * @memberof module:middlewares/error.handler
 * @example
 * const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
 * app.use(errorHandler);
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

/**
 * @function boomErrorHandler
 * @description Boom error handler
 * @param {object} err - Error object
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next middleware function
 * @returns {object} - Response object
 * @version 1.0.0
 * @since 1.0.0
 * @memberof module:middlewares/error.handler
 * @example
 * const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
 * app.use(boomErrorHandler);
 * @see {@link https://www.npmjs.com/package/@hapi/boom}
 * @see {@link https://www.npmjs.com/package/@hapi/boom#boom}
 * @see {@link https://www.npmjs.com/package/@hapi/boom#boomifyerror-options}
 * @see {@link https://www.npmjs.com/package/@hapi/boom#boombadrequestmessage-data}
 * @see {@link https://www.npmjs.com/package/@hapi/boom#boombadimplementationmessage-data}
 * @see {@link https://www.npmjs.com/package/@hapi/boom#boombadgatewaymessage-data}
 */
// eslint-disable-next-line no-unused-vars
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

/**
 * @function ormErrorHandler
 * @description ORM error handler
 * @param {object} err - Error object
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next middleware function
 * @returns {object} - Response object
 * @version 1.0.0
 * @since 1.0.0
 * @memberof module:middlewares/error.handler
 * @example
 * const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
 * app.use(ormErrorHandler);
 * @see {@link https://www.npmjs.com/package/sequelize}
 * @see {@link https://sequelize.org/master/manual/models-usage.html#-code-validationerrors-code-}
 */
// eslint-disable-next-line no-unused-vars
function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }