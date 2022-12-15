/** @module routes/users.router 
 * @requires express
 * @author {author} dlrivada <{@mail dlrivada@hotmail.com}> ({@link http://dlrivada.com})
 * @requires services/user.service
 * @requires middlewares/validator.handler
 * @requires schemas/user.schema
 * @requires @hapi/boom
 * @requires @hapi/joi
 * @requires @hapi/joi#any.validate
 * @requires @hapi/joi#errors
 * @see {@link https://www.npmjs.com/package/express| express}
 * @see {@link https://www.npmjs.com/package/@hapi/boom| @hapi/boom}
 * @see {@link https://www.npmjs.com/package/@hapi/joi| @hapi/joi}
 * @see {@link https://www.npmjs.com/package/@hapi/joi#any.validate| @hapi/joi#any.validate}
 * @see {@link https://www.npmjs.com/package/@hapi/joi#errors| @hapi/joi#errors}
 * @see {@link https://www.npmjs.com/package/@hapi/joi#validation-api| @hapi/joi#validation-api}
 * @see {@link https://www.npmjs.com/package/@hapi/joi#anyerror| @hapi/joi#any.error}
*/

const express = require('express');

const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema, queryUserSchema } = require('./../schemas/user.schema');
const passport = require('passport');

const router = express.Router();
const service = new UserService();

/**
 * @swagger 
 * /users: 
 * get:
 * summary: Get all users
 * description: Get all users
 * tags:
 * - Users
 * parameters:
 * - in: query
 * name: offset
 * schema:
 * type: integer
 * - in: query
 * name: limit
 * schema:
 * type: integer
 * - in: query
 * name: order
 * schema:
 * type: boolean
 * - in: query
 * name: order_by_name
 * schema:
 * type: boolean
 * - in: query
 * name: order_desc
 * schema:
 * type: boolean
 * - in: query
 * name: oder_by_email
 * schema:
 * type: boolean
 * @description: Get all users
 * responses:
 * 200:
 * description: OK
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/User'
 * 400:
 * description: Bad Request
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 401:
 * description: Unauthorized
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 403:
 * description: Forbidden
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 404:
 * description: Not Found
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 500:
 * description: Internal Server Error
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * @param {object} req - Request object 
 * @param {object} res - Response object
 * @param {object} next - Next middleware
 * @returns {object} - Returns a json object
 * @example
 * return res.status(200).json(users);
 */
router.get('/', 
  passport.authenticate('jwt', { session: false }),
  validatorHandler(queryUserSchema, 'query'),
  async (req, res, next) => {
  try {
    const users = await service.find(req.query);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 * get:
 * summary: Get user by id
 * description: Get user by id
 * tags:
 * - Users
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: User id
 * - in: query
 * name: offset
 * schema:
 * type: integer
 * - in: query
 * name: limit
 * schema:
 * type: integer
 * - in: query
 * name: order
 * schema:
 * type: boolean
 * - in: query
 * name: order_by_name
 * schema:
 * type: boolean
 * - in: query
 * name: order_desc
 * schema:
 * type: boolean
 * - in: query
 * name: oder_by_email
 * schema:
 * type: boolean
 * @description: Get user by id
 * responses:
 * 200:
 * description: OK
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/User'
 * 400:
 * description: Bad Request
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 401:
 * description: Unauthorized
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 403:
 * description: Forbidden
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 404:
 * description: Not Found
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 500:
 * description: Internal Server Error
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {object} next - Next middleware
 * @returns {object} - Returns a json object
 * @example
 * return res.status(200).json(user);
 */
router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /users:
 * post:
 * summary: Create a user
 * description: Create a user
 * tags:
 * - Users
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * @description: Create a user
 * responses:
 * 201:
 * description: Created
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * 400:
 * description: Bad Request
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 401:
 * description: Unauthorized
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 403:
 * description: Forbidden
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 404:
 * description: Not Found
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 500:
 * description: Internal Server Error
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {object} next - Next middleware
 * @returns {object} - Returns a json object
 * @example
 * return res.status(201).json(newCategory);
 */
router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /users/{id}:
 * patch:
 * summary: Update a user
 * description: Update a user
 * tags:
 * - Users
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: User id
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * @description: Update a user
 * responses:
 * 200:
 * description: OK
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * 400:
 * description: Bad Request
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 401:
 * description: Unauthorized
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 403:
 * description: Forbidden
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 404:
 * description: Not Found
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 500:
 * description: Internal Server Error
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {object} next - Next middleware
 * @returns {object} - Returns a json object
 * @example
 * return res.status(200).json(category);
 * @example
 * return res.status(201).json({id});
 */
router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /users/{id}:
 * delete:
 * summary: Delete a user
 * description: Delete a user
 * tags:
 * - Users
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: User id
 * @description: Delete a user
 * responses:
 * 201:
 * description: Created
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * 400:
 * description: Bad Request
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 401:
 * description: Unauthorized
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 403:
 * description: Forbidden
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 404:
 * description: Not Found
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * 500:
 * description: Internal Server Error
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {object} next - Next middleware
 * @returns {object} - Returns a json object
 * @example
 * return res.status(201).json({id});
 */
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;