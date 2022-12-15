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
const jwt = require('jsonwebtoken');
const { AuthService } = require('../services/auth.service');
const { User } = require('../models/user.model');
const { Role } = require('../models/role.model');
const { models } = require('./../libs/sequelize');
const validatorHandler = require('./../middlewares/validator.handler');
const { loginSchema } = require('./../schemas/auth.schema');

const { config } = require('./../config');

const router = express.Router();
const authService = new AuthService();

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
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const login = await authService.login(user);
      res.status(200).json(login);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/refresh-token',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const { refreshToken: requestToken } = req.body;

      const newAccessToken = await authService.refreshToken(requestToken);
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }
);

router.post('/logout',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const { accessToken: requestToken } = req.body;
      const message = await authService.logout(requestToken);
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/logout-all',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const { accessToken: requestToken } = req.body;
      const message = await authService.logoutAll(requestToken);
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/register',
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await authService.register(email, password);
      res.status(200).json({
        message: 'Register successful',
        userId: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/forgot-password',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const message = await authService.forgotPassword(email);
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/reset-password',
  async (req, res, next) => {
    try {
      const { password, token } = req.body;
      const message = await authService.resetPassword(token, password);
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/change-password',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      res.json({
        message: 'Change password successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/change-email',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      res.json({
        message: 'Change email successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/verify-email',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Verify email successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/verify-phone',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Verify phone successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/change-phone',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      res.json({
        message: 'Change phone successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/verify-otp',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Verify otp successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/resend-otp',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Resend otp successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/validate-user',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Validate user successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/validate-admin',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Validate admin successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/validate-scope',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Validate scope successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/validate-sccopes',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Validate scopes successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/validate-All-sccopes',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Validate all scopes successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/validate-Any-sccopes',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Validate any scopes successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/validate-All-roles',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Validate all roles successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/validate-Any-roles',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Validate any roles successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/validate-roles',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Validate roles successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/validate-role',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Validate role successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/validate-All-permissions',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Validate all permissions successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/validate-Any-permissions',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Validate any permissions successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/validate-permissions',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Validate permissions successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/validate-permission',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Validate permission successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/validate-All-roles-permissions',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Validate all roles permissions successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/validate-Any-roles-permissions',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Validate any roles permissions successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/validate-roles-permissions',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Validate roles permissions successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/validate-role-permission',
  async (req, res, next) => {
    try {
      res.json({
        message: 'Validate role permission successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;