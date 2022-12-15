/**
 * This script verifies a password against a hash.
 * @fileoverview Verify password script
 * @author {author} dlrivada <{dlrivada@hotmail.com}> ({http://dlrivada.com})
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * node pass-verify.js
 * @see {@link https://www.npmjs.com/package/bcrypt| bcrypt}
 * @see {@link https://www.npmjs.com/package/bcrypt#usage| bcrypt usage}
 * @see {@link https://www.npmjs.com/package/bcrypt#to-check-a-password| bcrypt to check a password}
 */

const bcrypt = require('bcrypt');

/**
 * @function verifyPassword - Verify a password against a hash 
 * @name verifyPassword
 * @description
 * This function will verify a password against a hash
 * @returns {void}
 * @throws {Error} Will throw an error if the password is invalid
 * @example
 * verifyPassword();
 * @version 1.0.0
 * @since 1.0.0
 * @memberof module:pass-verify
 * @see {@link https://www.npmjs.com/package/bcrypt| bcrypt}
 * @see {@link https://www.npmjs.com/package/bcrypt#usage| bcrypt usage}
 * @see {@link https://www.npmjs.com/package/bcrypt#to-check-a-password| bcrypt to check a password}
 */
async function verifyPassword() {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$.q.8/z3PP1KrruUqNuK9quJgCHQ.5S4w3.FyKmHEGEFqc19OVEqBW';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();