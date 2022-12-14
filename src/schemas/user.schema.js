/** @module schemas/user.schema */ 
/** 
 * @fileoverview User schema module.
 * @author {author} dlrivada <{dlrivada@hotmail.com}> ({http://dlrivada.com}) 
 * @description User schema 
 * @requires joi 
 * @requires joi-number 
 * @requires joi-string
 * @requires joi-date
 * @requires joi-boolean
 * @requires joi-array
 * @requires joi-objectid
 * @requires joi-unique
 * @requires joi-credit-card
 * @requires joi-phone-number
 * @requires joi-iban
 * @requires joi-uuid
 * @requires joi-ipv4
 * @requires joi-ipv6
 * @requires joi-cnpj
 * @requires joi-cpf
 * @requires joi-cpf-cnpj
 * @requires joi-rg
 * @requires joi-rg-ie
 * @requires joi-rg-ie-sp
 * @requires joi-rg-ie-es
 * @exports schemas/user.schema 
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * const { id, email, password, role, offset, limit, customer_id, customer_name } = require('./user.schema');
 * @see {@link https://www.npmjs.com/package/joi| joi}
 * @see {@link https://www.npmjs.com/package/joi-number| joi-number}
 * @see {@link https://www.npmjs.com/package/joi-string| joi-string}
 * @see {@link https://www.npmjs.com/package/joi-date| joi-date}
 * @see {@link https://www.npmjs.com/package/joi-boolean| joi-boolean}
 * @see {@link https://www.npmjs.com/package/joi-array| joi-array}
 * @see {@link https://www.npmjs.com/package/joi-objectid| joi-objectid}
 * @see {@link https://www.npmjs.com/package/joi-unique| joi-unique}
 * @see {@link https://www.npmjs.com/package/joi-credit-card| joi-credit-card}
 * @see {@link https://www.npmjs.com/package/joi-phone-number| joi-phone-number}
 * @see {@link https://www.npmjs.com/package/joi-iban| joi-iban}
 * @see {@link https://www.npmjs.com/package/joi-uuid| joi-uuid}
 * @see {@link https://www.npmjs.com/package/joi-ipv4| joi-ipv4}
 * @see {@link https://www.npmjs.com/package/joi-ipv6| joi-ipv6}
 * @see {@link https://www.npmjs.com/package/joi-cnpj| joi-cnpj}
 * @see {@link https://www.npmjs.com/package/joi-cpf| joi-cpf}
 * @see {@link https://www.npmjs.com/package/joi-cpf-cnpj| joi-cpf-cnpj}
 * @see {@link https://www.npmjs.com/package/joi-rg| joi-rg}
 * @see {@link https://www.npmjs.com/package/joi-rg-ie| joi-rg-ie}
 * @see {@link https://www.npmjs.com/package/joi-rg-ie-sp| joi-rg-ie-sp}
 * @see {@link https://www.npmjs.com/package/joi-rg-ie-es| joi-rg-ie-es}
 */ 

const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);
const offset = Joi.number().integer().min(0);
const limit = Joi.number().integer().min(1).max(100);
const customer_id = Joi.number().integer();
const customer_name = Joi.string();

/**
 * @description schema for create user
 * @type {Joi.ObjectSchema} createUserSchema
 * @property {Joi.StringSchema} email - Email of user
 * @property {Joi.StringSchema} password - Password of user
 * @property {Joi.StringSchema} role - Role of user
 * @returns {Joi.ValidationResult} - Result of validation
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { createUserSchema } = require('./user.schema');
 * const { error, value } = createUserSchema.validate({ email: 'jhon.doe@example',
 * password: '12345678', role: 'customer' });
 * if (error) {
 * // handle error
 * }
 * if (value) {
 * // handle value
 * }
 * // value = { email: 'jhon.doe@example', password: '12345678', role: 'customer' }
 */
const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required()
});

/**
 * @description schema for update user
 * @type {Joi.ObjectSchema} updateUserSchema
 * @property {Joi.StringSchema} email - Email of user
 * @property {Joi.StringSchema} role - Role of user
 * @returns {Joi.ValidationResult} - Result of validation
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { updateUserSchema } = require('./user.schema');
 * const { error, value } = updateUserSchema.validate({ email: 'jhon.doe@example',
 * role: 'customer' });
 * if (error) {
 * // handle error
 * }
 * if (value) {
 * // handle value
 * }
 * // value = { email: 'jhon.doe@example', role: 'customer' }
 */
const updateUserSchema = Joi.object({
  email: email,
  role: role,
});

/**
 * @description schema for get user
 * @type {Joi.ObjectSchema} getUserSchema
 * @property {Joi.NumberSchema} id - Id of user
 * @returns {Joi.ValidationResult} - Result of validation
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { getUserSchema } = require('./user.schema');
 * const { error, value } = getUserSchema.validate({ id: 1 });
 * if (error) {
 * // handle error
 * }
 * if (value) {
 * // handle value
 * }
 * // value = { id: 1 }
 */
const getUserSchema = Joi.object({
  id: id.required(),
});

/**
 * @description schema for query user
 * @type {Joi.ObjectSchema} queryUserSchema
 * @property {Joi.NumberSchema} offset - Offset of user
 * @property {Joi.NumberSchema} limit - Limit of user
 * @property {Joi.StringSchema} email - Email of user
 * @property {Joi.StringSchema} role - Role of user
 * @property {Joi.NumberSchema} customer_id - Customer id of user
 * @property {Joi.StringSchema} customer_name - Customer name of user
 * @returns {Joi.ValidationResult} - Result of validation
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { queryUserSchema } = require('./user.schema');
 * const { error, value } = queryUserSchema.validate({ offset: 0, limit: 10,
 * email: 'jhon.doe@example', role: 'customer', customer_id: 1, customer_name: 'Jhon Doe' });
 * if (error) {
 * // handle error
 * }
 * if (value) {
 * // handle value
 * }
 * // value = { offset: 0, limit: 10, email: 'jhon.doe@example', role: 'customer',
 * // customer_id: 1, customer_name: 'Jhon Doe' }
 */
const queryUserSchema = Joi.object({
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
  email,
  role,
  customer_id,
  customer_name
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema, queryUserSchema }