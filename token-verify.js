/**
 * @module token-verify - Verify a token with jsonwebtoken 
 * @fileoverview Verify a token with jsonwebtoken 
 * @author {author} dlrivada <{dlrivada@hotmail.com}> ({http://dlrivada.com})
 * @param {string} token
 * @param {string} secret
 * @returns {Object}
 * @example
 * const payload = verifyToken(token, secret);
 * @version 1.0.0
 * @since 1.0.0
 * @memberof module:token-verify
 * @see {@link https://www.npmjs.com/package/jsonwebtoken| jsonwebtoken}
 * @see {@link https://www.npmjs.com/package/jsonwebtoken#usage| jsonwebtoken usage}
 * @see {@link https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback| jsonwebtoken jwtverifytoken}
 */

const jwt = require('jsonwebtoken');

// const secret
const secret = 'myCat';
// const token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMDQzMzY1M30.tY6btdWHq1J9qYVTbjYrt9vxrfWKHi9fuOhElKmwf9k';

/**
 * @function verifyToken - Verify a token with jsonwebtoken
 * @name verifyToken
 * @description
 * This function will verify a token with jsonwebtoken
 * @returns {Object}
 * @example
 * const payload = verifyToken(token, secret);
 * @version 1.0.0
 * @since 1.0.0
 * @memberof module:token-verify
 * @see {@link https://www.npmjs.com/package/jsonwebtoken| jsonwebtoken}
 * @see {@link https://www.npmjs.com/package/jsonwebtoken#usage| jsonwebtoken usage}
 * @see {@link https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback| jsonwebtoken jwtverifytoken}
 */
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);