/**
 * @fileoverview Auth router 
 * @author {author} dlrivada <{dlrivada@hotmail.com}> ({http://dlrivada.com})
 * @module routes/auth.router 
 * @requires express
 * @requires passport
 * @requires ./../utils/auth
 * @requires ./../utils/auth/strategies/local.strategy
 * @requires ./../utils/auth/strategies/jwt.strategy
 * @see {@link https://www.npmjs.com/package/express| express}
 * @see {@link https://www.npmjs.com/package/passport| passport}
 * @see {@link https://www.npmjs.com/package/passport-local| passport-local}
 * @see {@link https://www.npmjs.com/package/passport-jwt| passport-jwt}
 * @see {@link https://www.npmjs.com/package/express-validator| express-validator}
 * @see {@link https://www.npmjs.com/package/express-validator#validation-chain-api| express-validator validation chain api}
 * @see {@link https://www.npmjs.com/package/express-validator#validation-result-api| express-validator validation result api}
 * @see {@link https://www.npmjs.com/package/express-validator#sanitization-chain-api| express-validator sanitization chain api}
 * @see {@link https://www.npmjs.com/package/express-validator#sanitization-result-api| express-validator sanitization result api}
 * @see {@link https://www.npmjs.com/package/express-validator#custom-validators-sanitizers| express-validator custom validators sanitizers}
 * @see {@link https://www.npmjs.com/package/express-validator#custom-validation-sanitization| express-validator custom validation sanitization}
 * @see {@link https://www.npmjs.com/package/express-validator#async-validation| express-validator async validation}
 * @see {@link https://www.npmjs.com/package/express-validator#async-sanitization| express-validator async sanitization}
 * @see {@link https://www.npmjs.com/package/express-validator#validation-result-api| express-validator validation result api}
 */

const express = require('express');
const passport = require('passport');


const router = express.Router();

/**
 * @swagger
 * /login:
 * post:
 * tags:
 * - "auth"
 * summary: "Login"
 * description: "Login"
 * operationId: "login"
 * produces:
 * - "application/json"
 * parameters:
 * - in: "body"
 * name: "body"
 * description: "Login"
 * required: true
 * schema:
 * $ref: "#/definitions/Login"
 * responses:
 * 200:
 * description: "successful operation"
 * schema:
 * $ref: "#/definitions/LoginResponse"
 * 400:
 * description: "Invalid username/password supplied"
 * 401:
 * description: "Unauthorized"
 * 404:
 * description: "Not found"
 * security:
 * - api_key: []
 * definitions:
 * Login:
 * type: "object"
 * required:
 * - "email"
 * - "password"
 * properties:
 * email:
 * type: "string"
 * example: "
 * password:
 * type: "string"
 * example: "
 * LoginResponse:
 * type: "object"
 * properties:
 * token:
 * type: "string"
 * example: "
 * x-access-token:
 * type: "string"
 * example: "
 * x-refresh-token:
 * type: "string" 
 * @description Login route
 * @function POST /login
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * POST /login
 * {
 * "email": "
 * "password": "
 * }
 * @see {@link https://www.npmjs.com/package/express| express}
 * @see {@link https://www.npmjs.com/package/passport| passport}
 * @see {@link https://www.npmjs.com/package/passport-local| passport-local}
 * @see {@link https://www.npmjs.com/package/passport-jwt| passport-jwt}
 * @see {@link https://www.npmjs.com/package/express-validator| express-validator}
 * @see {@link https://www.npmjs.com/package/express-validator#validation-chain-api| express-validator validation chain api}
 * @see {@link https://www.npmjs.com/package/express-validator#validation-result-api| express-validator validation result api}
 * @see {@link https://www.npmjs.com/package/express-validator#sanitization-chain-api| express-validator sanitization chain api}
 * @see {@link https://www.npmjs.com/package/express-validator#sanitization-result-api| express-validator sanitization result api}
 * @see {@link https://www.npmjs.com/package/express-validator#custom-validators-sanitizers| express-validator custom validators sanitizers}
 * @see {@link https://www.npmjs.com/package/express-validator#custom-validation-sanitization| express-validator custom validation sanitization}
 * @see {@link https://www.npmjs.com/package/express-validator#async-validation| express-validator async validation}
 * @see {@link https://www.npmjs.com/package/express-validator#async-sanitization| express-validator async sanitization}
 * @see {@link https://www.npmjs.com/package/express-validator#validation-result-api| express-validator validation result api}
 */
router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;