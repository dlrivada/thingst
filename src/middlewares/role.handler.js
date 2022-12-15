/**
 * @module middlewares/role.handler - Middleware to check the role in the request user 
 * @requires @hapi/boom
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * const roleHandler = require('./middlewares/role.handler');
 * router.get('/', roleHandler.checkAdminRole, usersController.getUsers);
 * @see {@link https://www.npmjs.com/package/@hapi/boom| @hapi/boom}
 * @see {@link https://www.npmjs.com/package/joi| joi}
 * @see {@link https://www.npmjs.com/package/joi#validation-api| joi validation api}
 * @see {@link https://www.npmjs.com/package/joi#anyvalidatevalue-options| joi any.validate(value, [options])}
 * @see {@link https://www.npmjs.com/package/joi#errors| joi errors}
 */

const boom = require('@hapi/boom');

/**
 * @function checkAdminRole - Middleware to check the admin role in the request user
 * @name checkAdminRole
 * @description
 * This function is a middleware that checks the admin role in the request user.
 * If the user has the admin role, the next middleware is called.
 * If the user does not have the admin role, an error is thrown.
 * @returns {function} - Middleware function
 * @throws {object} - Boom error 
 * @example
 * const roleHandler = require('./middlewares/role.handler');
 * router.get('/', roleHandler.checkAdminRole, usersController.getUsers);
 * @version 1.0.0
 * @since 1.0.0
 * @memberof module:middlewares/auth.handler
 * @see {@link https://www.npmjs.com/package/@hapi/boom| @hapi/boom}
 * @see {@link https://www.npmjs.com/package/joi| joi}
 * @see {@link https://www.npmjs.com/package/joi#validation-api| joi validation api}
 * @see {@link https://www.npmjs.com/package/joi#anyvalidatevalue-options| joi any.validate(value, [options])}
 * @see {@link https://www.npmjs.com/package/joi#errors| joi errors}
 */
function checkAdminRole(req, res, next) {
  const { role } = req.user;
  if (role === 'admin') {
    next();
  } else {
    next(boom.forbidden('se requieren permisos de administrador'));
  }
}

/**
 * @function checkRoles - Middleware to check the role in the request user 
 * @name checkRoles 
 * @description
 * This function is a middleware that checks the role in the request user.
 * If the user has the role, the next middleware is called.
 * If the user does not have the role, an error is thrown.
 * @param {...string} roles - Roles to check in the request user 
 * @returns {function} - Middleware function 
 * @throws {object} - Boom error
 * @example
 * const roleHandler = require('./middlewares/role.handler');
 * router.get('/', roleHandler.checkRoles('admin', 'user'), usersController.getUsers);
 * @version 1.0.0
 * @since 1.0.0
 * @memberof module:middlewares/auth.handler
 * @see {@link https://www.npmjs.com/package/@hapi/boom| @hapi/boom}
 * @see {@link https://www.npmjs.com/package/joi| joi}
 * @see {@link https://www.npmjs.com/package/joi#validation-api| joi validation api}
 * @see {@link https://www.npmjs.com/package/joi#anyvalidatevalue-options| joi any.validate(value, [options])}
 * @see {@link https://www.npmjs.com/package/joi#errors| joi errors}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters| Rest parameters}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax| Spread syntax}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes| Array.prototype.includes()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some| Array.prototype.some()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every| Array.prototype.every()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach| Array.prototype.forEach()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map| Array.prototype.map()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter| Array.prototype.filter()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce| Array.prototype.reduce()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight| Array.prototype.reduceRight()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find| Array.prototype.find()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex| Array.prototype.findIndex()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from| Array.from()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of| Array.of()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries| Array.prototype.entries()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys| Array.prototype.keys()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values| Array.prototype.values()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin| Array.prototype.copyWithin()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill| Array.prototype.fill()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop| Array.prototype.pop()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push| Array.prototype.push()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse| Array.prototype.reverse()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift| Array.prototype.shift()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice| Array.prototype.slice()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort| Array.prototype.sort()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice| Array.prototype.splice()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift| Array.prototype.unshift()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat| Array.prototype.concat()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join| Array.prototype.join()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf| Array.prototype.lastIndexOf()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf| Array.prototype.indexOf()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString| Array.prototype.toLocaleString()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString| Array.prototype.toString()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes| Array.prototype.includes()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some| Array.prototype.some()}
 */
function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.forbidden('se requieren permisos de administrador'));
    }
  }
}

module.exports = { checkAdminRole, checkRoles };
