/**
 * @fileoverview Profile router
 * @module routes/profile.router 
 * @author {author} dlrivada <{dlrivada@hotmail.com}> ({http://dlrivada.com})
 * @requires express
 * @requires passport
 * @requires ./../services/order.service
 * @requires ./../middlewares/validator.handler
 * @requires ./../schemas/order.schema
 * @requires ./../schemas/orderline.schema
 * @description This module is used to handle the profile routes
 * @exports router
 * @see {@link https://www.npmjs.com/package/express| express}
 * @see {@link https://www.npmjs.com/package/passport| passport}
 * @see {@link https://www.npmjs.com/package/validator| validator}
 * @see {@link https://www.npmjs.com/package/express-validator| express-validator}
 */

const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');

const router = express.Router();
const service = new OrderService();

router.get('/my-orders',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;