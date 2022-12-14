const Joi = require('joi');

const id = Joi.number().integer();
const status = Joi.string().valid('pending', 'approved', 'rejected');
const createdAt = Joi.date();
const { createCustomerSchema, updateCustomerSchema } = require('./customer.schema');
const offset = Joi.number().integer().min(0);
const limit = Joi.number().integer().min(1).max(100);
const customer_id = Joi.number().integer();
const customer_name = Joi.string();

/**
 * @description schema for get order
 * @type {Joi.ObjectSchema} getOrderSchema
 * @property {Joi.NumberSchema} id.required - id of the order
 * @returns {Joi.ObjectSchema} getOrderSchema
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { getOrderSchema } = require('./schemas/order.schema');
 * const { error, value } = getOrderSchema.validate({
 *  "id": 1
 * });
 * if (error) {
 * // handle error
 * }
 * if (value) {
 * // handle value
 * }
 * // value = { id: 1 }
 */
const getOrderSchema = Joi.object({
    id: id.required(),
});

/**
 * @description schema for create order
 * @type {Joi.ObjectSchema} createOrderSchema
 * @property {Joi.StringSchema} status.required - status of the order
 * @property {Joi.NumberSchema} customer_id.required - id of the customer
 * @property {Joi.ObjectSchema} customer - customer of the order
 * @property {Joi.StringSchema} customer.name - name of the customer
 * @property {Joi.StringSchema} customer.lastName - lastName of the customer
 * @property {Joi.StringSchema} customer.phone - phone of the customer
 * @returns {Joi.ObjectSchema} createOrderSchema
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { createOrderSchema } = require('./schemas/order.schema');
 * const { error, value } = createOrderSchema.validate({
 *  "status": "pending",
 *  "customer_id": 1,
 *  "customer": {
 *   "name": "John",
 *   "lastName": "Doe",
 *   "phone": "123456789"
 *  }
 * });
 * if (error) {
 * // handle error
 * }
 * if (value) {
 * // handle value
 * }
 * // value = {
 * //  "status": "pending",
 * //  "customer_id": 1,
 * //  "customer": {
 * //   "name": "John",
 * //   "lastName": "Doe",
 * //   "phone": "123456789"
 * //  }
 * // }
 */
const createOrderSchema = Joi.object({
    status: status.required(),
    customer_id: customer_id.required(),
    customer: createCustomerSchema,
});

/**
 * @description schema for update order
 * @type {Joi.ObjectSchema} updateOrderSchema
 * @property {Joi.StringSchema} status - status of the order
 * @property {Joi.NumberSchema} customer_id - id of the customer
 * @property {Joi.ObjectSchema} customer - customer of the order
 * @property {Joi.StringSchema} customer.name - name of the customer
 * @property {Joi.StringSchema} customer.lastName - lastName of the customer
 * @property {Joi.StringSchema} customer.phone - phone of the customer
 * @returns {Joi.ObjectSchema} updateOrderSchema
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { updateOrderSchema } = require('./schemas/order.schema');
 * const { error, value } = updateOrderSchema.validate({
 *  "status": "pending",
 *  "customer_id": 1,
 *  "customer": {
 *   "name": "John",
 *   "lastName": "Doe",
 *   "phone": "123456789"
 *  }
 * });
 * if (error) {
 * // handle error
 * }
 * if (value) {
 * // handle value
 * }
 * // value = {
 * //  "status": "pending",
 * //  "customer_id": 1,
 * //  "customer": {
 * //   "name": "John",
 * //   "lastName": "Doe",
 * //   "phone": "123456789"
 * //  }
 * // }
 */
const updateOrderSchema = Joi.object({
    status: status,
    customer_id: customer_id,
    customer: updateCustomerSchema,
});

/**
 * @description schema for query order
 * @type {Joi.ObjectSchema} queryOrderSchema
 * @property {Joi.NumberSchema} offset - offset of the order
 * @property {Joi.NumberSchema} limit - limit of the order
 * @property {Joi.StringSchema} status - status of the order
 * @property {Joi.DateSchema} createdAt - createdAt of the order
 * @property {Joi.NumberSchema} customer_id - id of the customer
 * @property {Joi.StringSchema} customer_name - name of the customer
 * @returns {Joi.ObjectSchema} queryOrderSchema
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example 
 * const { queryOrderSchema } = require('./schemas/order.schema');
 * const { error, value } = queryOrderSchema.validate({
 *  "offset": 0,
 *  "limit": 10,
 *  "status": "pending",
 *  "createdAt": "2021-01-01",
 *  "customer_id": 1,
 *  "customer_name": "John"
 * });
 * if (error) {
 * // handle error
 * }
 * if (value) {
 * // handle value
 * }
 * // value = {
 * //  "offset": 0,
 * //  "limit": 10,
 * //  "status": "pending",
 * //  "createdAt": "2021-01-01",
 * //  "customer_id": 1,
 * //  "customer_name": "John"
 * // }
 */
const queryOrderSchema = Joi.object({
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
    status,
    createdAt,
    customer_id: customer_id.when('customer_name', {
        is: Joi.exist(),
        then: Joi.required(),
    }),
    customer_name: customer_name.when('customer_id', {
        is: Joi.exist(),
        then: Joi.required(),
    }),
});

module.exports = { getOrderSchema, createOrderSchema, updateOrderSchema, queryOrderSchema };
