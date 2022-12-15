/**
 * This script will hash a password using bcrypt 
 * @fileoverview Hash password script
 * @author {author} dlrivada <{dlrivada@hotmail.com}> ({http://dlrivada.com})
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * node pass-hash.js
 * @see {@link https://www.npmjs.com/package/bcrypt| bcrypt}
 * @see {@link https://www.npmjs.com/package/bcrypt#usage| bcrypt usage}
 * @see {@link https://www.npmjs.com/package/bcrypt#to-hash-a-password| bcrypt to hash a password}
 */

const bcrypt = require('bcrypt');

/**
 * @function hashPassword - Hash a password using bcrypt 
 * @name hashPassword 
 * @description
 * This function will hash a password using bcrypt
 * @returns {void}
 * @throws {Error} Will throw an error if the password is invalid
 * @example
 * hashPassword();
 * @version 1.0.0
 * @since 1.0.0
 * @memberof module:pass-hash
 * @see {@link https://www.npmjs.com/package/bcrypt| bcrypt}
 * @see {@link https://www.npmjs.com/package/bcrypt#usage| bcrypt usage}
 * @see {@link https://www.npmjs.com/package/bcrypt#to-hash-a-password| bcrypt to hash a password}
 */
async function hashPassword() {
  const myPassword = 'admin 123 .202';
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPassword();