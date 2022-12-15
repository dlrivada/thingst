const express = require('express');

const OrderService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getOrderSchema, createOrderSchema, updateOrderSchema, queryOrderSchema } = require('./../schemas/order.schema');
const { createOrderLineSchema } = require('./../schemas/orderline.schema');
const passport = require('passport');

const router = express.Router();
const service = new OrderService();

router.get('/', 
passport.authenticate('jwt', { session: false }),
validatorHandler(queryOrderSchema, 'query'),
async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get('/:id', 
passport.authenticate('jwt', { session: false }),
validatorHandler(getOrderSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    res.json(await service.findOne(id));
  } catch (error) {
    next(error);
  }
});

router.post('/', 
passport.authenticate('jwt', { session: false }),
validatorHandler(createOrderSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    res.status(201).json(await service.create(body));
  } catch (error) {
    next(error);
  }
});

router.post('/:id/orderlines',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(createOrderLineSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.createOrderLine(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', 
passport.authenticate('jwt', { session: false }),
validatorHandler(getOrderSchema, 'params'), 
validatorHandler(updateOrderSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    res.status(201).json(await service.update(id, body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', 
passport.authenticate('jwt', { session: false }),
validatorHandler(getOrderSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    res.status(200).json(await service.delete(id));
  } catch (error) {
    next(error);
  }
});

module.exports = router;