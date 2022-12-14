const Joi = require('joi');

const id = Joi.number().integer();
const firstName = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone =  Joi.string();
const { createUserSchema, updateUserSchema } = require('./user.schema');
const offset = Joi.number().integer().min(0);
const limit = Joi.number().integer().min(1).max(100);

/**
 * @description Schema for get customer
 * @type {Joi.ObjectSchema} getCustomerSchema
 * @property {Joi.NumberSchema} id - Id of customer
 * @returns {Joi.ValidationResult} - Result of validation
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { getCustomerSchema } = require('./customer.schema');
 * const { error, value } = getCustomerSchema.validate({ id: 1 });
 * if (error) {
 *  // handle error
 * }
 * if (value) {
 *  // handle value
 * }
 * // value is { id: 1 }
*/
const getCustomerSchema = Joi.object({
  id: id.required(),
});

/**
 * @description Schema for create customer
 * @type {Joi.ObjectSchema} createCustomerSchema
 * @property {Joi.StringSchema} name - First name of customer
 * @property {Joi.StringSchema} lastName - Last name of customer
 * @property {Joi.StringSchema} phone - Phone of customer
 * @property {Joi.ObjectSchema} user - User of customer
 * @property {Joi.StringSchema} user.email - Email of user
 * @property {Joi.StringSchema} user.password - Password of user
 * @property {Joi.StringSchema} user.role - Role of user
 * @returns {Joi.ValidationResult} - Result of validation
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { createCustomerSchema } = require('./customer.schema');
 * const { error, value } = createCustomerSchema.validate({ name: 'John', lastName: 'Doe', phone: '1234567890', 
 * user: { email: 'jhon.doe@example', password: '12345678', role: 'customer' } });
 * if (error) {
 * // handle error
 * }
 * if (value) {
 *  // handle value
 * }
 * // value is { name: 'John', lastName: 'Doe', phone: '1234567890',
 * // user: { email: 'jhon.doe@example', password: '12345678', role: 'customer' } } 
 */
const createCustomerSchema = Joi.object({
  name: firstName.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema
});

/**
 * @description Schema for update customer
 * @type {Joi.ObjectSchema} updateCustomerSchema
 * @property {Joi.StringSchema} name - First name of customer
 * @property {Joi.StringSchema} lastName - Last name of customer
 * @property {Joi.StringSchema} phone - Phone of customer
 * @property {Joi.ObjectSchema} user - User of customer
 * @property {Joi.StringSchema} user.email - Email of user
 * @property {Joi.StringSchema} user.password - Password of user
 * @property {Joi.StringSchema} user.role - Role of user
 * @returns {Joi.ValidationResult} - Result of validation
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { updateCustomerSchema } = require('./customer.schema');
 * const { error, value } = updateCustomerSchema.validate({ name: 'John', lastName: 'Doe', phone: '1234567890',
 * user: { email: 'jhon.doe@example', password: '12345678', role: 'customer' } });
 * if (error) {
 * // handle error
 * }
 * if (value) {
 * // handle value
 * }
 * // value is { name: 'John', lastName: 'Doe', phone: '1234567890',
 * // user: { email: 'jhon.doe@example', password: '12345678', role: 'customer' } }
*/
const updateCustomerSchema = Joi.object({
  name: firstName,
  lastName: lastName,
  phone: phone,
  user: updateUserSchema
});

/**
 * @description Schema for query customer
 * @type {Joi.ObjectSchema} queryCustomerSchema
 * @property {Joi.NumberSchema} offset - Offset of customer
 * @property {Joi.NumberSchema} limit - Limit of customer
 * @property {Joi.StringSchema} name - First name of customer
 * @property {Joi.StringSchema} lastName - Last name of customer
 * @property {Joi.StringSchema} phone - Phone of customer
 * @returns {Joi.ValidationResult} - Result of validation
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { queryCustomerSchema } = require('./customer.schema');
 * const { error, value } = queryCustomerSchema.validate({ offset: 0, limit: 10, name: 'John', lastName: 'Doe', phone: '1234567890' });
 * if (error) {
 * // handle error
 * }
 * if (value) {
 * // handle value
 * }
 * // value is { offset: 0, limit: 10, name: 'John', lastName: 'Doe', phone: '1234567890' }
 */
const queryCustomerSchema = Joi.object({
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
  name,
  lastName,
  phone,
});

module.exports = { getCustomerSchema, createCustomerSchema, updateCustomerSchema, queryCustomerSchema };