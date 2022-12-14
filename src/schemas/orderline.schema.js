const Joi = require('joi');

const id = Joi.number().integer();
const quantity = Joi.number().integer().min(1);
const price = Joi.number().integer().min(10);
const product_Id = Joi.number().integer();
const product_name = Joi.string().min(3).max(15);
const orderId = Joi.number().integer();
const { createProductSchema, updateProductSchema } = require('./product.schema');
const { createOrderSchema, updateOrderSchema } = require('./order.schema');
const offset = Joi.number().integer().min(0);
const limit = Joi.number().integer().min(1).max(100);

/**
 * @description Schema for orderline id
 * @type {Joi.ObjectSchema} orderline id schema
 * @property {Joi.StringSchema} id.required - orderline id 
 * @returns {Joi.ObjectSchema} getOrderSchema
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { getOrderLineSchema } = require('./schemas/orderline.schema');
 * const { error, value } = getOrderLineSchema.validate({
 *  "id": 1
 * });
 * if (error) {
 * // Handle error
 * }
 * if (value) {
 * // Handle value
 * }
 * // value is { id: 1 }
 */
const getOrderLineSchema = Joi.object({
    id: id.required(),
});

/**
 * @description Schema for create orderline
 * @type {Joi.ObjectSchema} createOrderLineSchema
 * @property {Joi.NumberSchema} quantity.required - quantity of the orderline
 * @property {Joi.NumberSchema} price.required - price of the orderline
 * @property {Joi.ObjectSchema} order - order of the orderline
 * @property {Joi.ObjectSchema} product - product of the orderline
 * @returns {Joi.ObjectSchema} createOrderLineSchema
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { createOrderLineSchema } = require('./schemas/orderline.schema');
 * const { error, value } = createOrderLineSchema.validate({
 *  "quantity": 1,
 *  "price": 100,
 *  "order": {
 *   "id": 1
 *  },
 *  "product": {
 *   "id": 1
 *  }
 * });
 * if (error) {
 * // Handle error
 * }
 * if (value) {
 * // Handle value
 * }
 * // value is { quantity: 1, price: 100, order: { id: 1 }, product: { id: 1 } }
 */
const createOrderLineSchema = Joi.object({
    quantity: quantity.required(),
    price: price.required(),
    order: createOrderSchema,
    product: createProductSchema,
});

/**
 * @description Schema for update orderline
 * @type {Joi.ObjectSchema} updateOrderLineSchema
 * @property {Joi.NumberSchema} quantity - quantity of the orderline
 * @property {Joi.NumberSchema} price - price of the orderline
 * @property {Joi.ObjectSchema} order - order of the orderline
 * @property {Joi.ObjectSchema} product - product of the orderline
 * @returns {Joi.ObjectSchema} updateOrderLineSchema
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { updateOrderLineSchema } = require('./schemas/orderline.schema');
 * const { error, value } = updateOrderLineSchema.validate({
 *  "quantity": 1,
 *  "price": 100,
 *  "order": {
 *   "id": 1
 *  },
 *  "product": {
 *   "id": 1
 *  }
 * });
 * if (error) {
 * // Handle error
 * }
 * if (value) {
 * // Handle value
 * }
 * // value is { quantity: 1, price: 100, order: { id: 1 }, product: { id: 1 } }
 */
const updateOrderLineSchema = Joi.object({
    quantity: quantity,
    price: price,
    order: updateOrderSchema,
    product: updateProductSchema,
});

/**
 * @description Schema for query orderline
 * @type {Joi.ObjectSchema} queryOrderLineSchema
 * @property {Joi.NumberSchema} offset - offset of the orderline
 * @property {Joi.NumberSchema} limit - limit of the orderline
 * @property {Joi.NumberSchema} product_Id - product_Id of the orderline
 * @property {Joi.StringSchema} product_name - product_name of the orderline
 * @property {Joi.NumberSchema} orderId - orderId of the orderline
 * @returns {Joi.ObjectSchema} queryOrderLineSchema
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { queryOrderLineSchema } = require('./schemas/orderline.schema');
 * const { error, value } = queryOrderLineSchema.validate({
 *  "offset": 0,
 *  "limit": 10,
 *  "product_Id": 1,
 *  "product_name": "product",
 *  "orderId": 1
 * });
 * if (error) {
 * // Handle error
 * }
 * if (value) {
 * // Handle value
 * }
 * // value is { offset: 0, limit: 10, product_Id: 1, product_name: "product", orderId: 1 }
 */
const queryOrderLineSchema = Joi.object({
    offset: offset.when('limit', {
        is: Joi.exist(),
        then: Joi.number().integer().min(0),
        otherwise: Joi.number().integer().min(0).max(1000)
      }),
      limit: limit.when('offset', {
        is: Joi.exist(),
        then: Joi.number().integer().min(1).max(100),
        otherwise: Joi.number().integer().min(1).max(1000)
      }),
    product_Id: product_Id.when('product_name', {
        is: Joi.exist(),
        then: Joi.number().integer().max(Joi.ref('product_name')),
        otherwise: Joi.number().integer().min(10)
    }),
    product_name: product_name.when('product_Id', {
        is: Joi.exist(),
        then: Joi.string().min(3).max(15).min(Joi.ref('product_Id')),
        otherwise: Joi.string().min(3).max(15).min(10)
    }),
    orderId,
});

module.exports = { getOrderLineSchema, createOrderLineSchema, updateOrderLineSchema, queryOrderLineSchema };
