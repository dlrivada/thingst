/**
 * @fileoverview Validator Handler
 * @author {author} dlrivada <{dlrivada@hotmail.com}> ({http://dlrivada.com})
 * @module middlewares/validator.handler
 * @requires @hapi/boom
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * const validatorHandler = require('./middlewares/validator.handler');
 * const { createSchema } = require('./schemas/users');
 * router.post('/', validatorHandler(createSchema, 'body'), usersController.create);
 * @see {@link https://www.npmjs.com/package/@hapi/boom| @hapi/boom}
 * @see {@link https://www.npmjs.com/package/joi| joi}
 * @see {@link https://www.npmjs.com/package/joi#validation-api| joi validation api}
 * @see {@link https://www.npmjs.com/package/joi#anyvalidatevalue-options| joi any.validate(value, [options])}
 * @see {@link https://www.npmjs.com/package/joi#errors| joi errors}
 */

const boom = require('@hapi/boom');

/**
 * @function validatorHandler - Middleware to validate data using a Joi schema 
 * @name validatorHandler 
 * @description
 * This function is a middleware that validates the data of a request
 * using a Joi schema. If the data is valid, the next middleware is called.
 * If the data is invalid, an error is thrown.
 * @param {object} schema - Joi schema
 * @param {string} property - Property to validate
 * @returns {function} - Middleware function
 * @throws {object} - Boom error
 * @example
 * const validatorHandler = require('./middlewares/validator.handler');
 * const { createSchema } = require('./schemas/users');
 * router.post('/', validatorHandler(createSchema, 'body'), usersController.create);
 * @version 1.0.0
 * @since 1.0.0
 * @memberof module:middlewares/validator.handler 
 * @see {@link https://www.npmjs.com/package/@hapi/boom| @hapi/boom}
 * @see {@link https://www.npmjs.com/package/joi| joi}
 * @see {@link https://www.npmjs.com/package/joi#validation-api| joi validation api}
 * @see {@link https://www.npmjs.com/package/joi#anyvalidatevalue-options| joi any.validate(value, [options])}
 * @see {@link https://www.npmjs.com/package/joi#errors| joi errors}
 */
function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;