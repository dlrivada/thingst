/**
 * @module token-sign - Sign a token with jsonwebtoken 
 * @fileoverview Sign a token with jsonwebtoken
 * @author {author} dlrivada <{dlrivada@hotmail.com}> ({http://dlrivada.com})
 * @param {Object} payload
 * @param {string} secret
 * @returns {string}
 * @example
 * const token = signToken(payload, secret);
 * @version 1.0.0
 * @since 1.0.0
 * @memberof module:token-sign
 * @see {@link https://www.npmjs.com/package/jsonwebtoken| jsonwebtoken}
 * @see {@link https://www.npmjs.com/package/jsonwebtoken#usage| jsonwebtoken usage}
 * @see {@link https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback| jsonwebtoken jwtsignpayload}
 */

const jwt = require('jsonwebtoken');

// const secret
const secret = 'myCat';
// const payload
const payload = {
  sub: 1,
  role: 'customer'
}

/**
 * @function signToken - Sign a token with jsonwebtoken
 * @name signToken
 * @description
 * This function will sign a token with jsonwebtoken
 * @returns {string}
 * @throws {Error} Will throw an error if the token is invalid
 * @example
 * const token = signToken(payload, secret);
 * @version 1.0.0
 * @since 1.0.0
 * @memberof module:token-sign
 * @see {@link https://www.npmjs.com/package/jsonwebtoken| jsonwebtoken}
 * @see {@link https://www.npmjs.com/package/jsonwebtoken#usage| jsonwebtoken usage}
 * @see {@link https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback| jsonwebtoken jwtsignpayload}
 */
function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);