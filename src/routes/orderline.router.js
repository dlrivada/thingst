const express = require('express');
const router = express.Router();
const OrderLineService = require('./../services/orderline.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getOrderLineSchema, createOrderLineSchema, updateOrderLineSchema, queryOrderLineSchema } = require('./../schemas/orderline.schema');
const service = new OrderLineService();

router.get('/', 
validatorHandler(queryOrderLineSchema, 'query'),
async (req, res, next) => {
    try {
        res.json(await service.find());
    } catch (error) {
        next(error);
    }
    });
router.get('/:id', validatorHandler(getOrderLineSchema, 'params'), async (req, res, next) => {
    try {
        const { id } = req.params;
        res.json(await service.findOne(id));
    } catch (error) {
        next(error);
    }
    });
router.post('/', validatorHandler(createOrderLineSchema, 'body'), async (req, res, next) => {
    try {
        const body = req.body;
        res.status(201).json(await service.create(body));
    } catch (error) {
        next(error);
    }
    });
router.patch('/:id', validatorHandler(getOrderLineSchema, 'params'), validatorHandler(updateOrderLineSchema, 'body'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        res.status(201).json(await service.update(id, body));
    } catch (error) {
        next(error);
    }
    });
router.delete('/:id', validatorHandler(getOrderLineSchema, 'params'), async (req, res, next) => {
    try {
        const { id } = req.params;
        res.status(200).json(await service.delete(id));
    } catch (error) {
        next(error);
    }
    });
module.exports = router;

