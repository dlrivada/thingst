const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();
const offset = Joi.number().integer().min(0);
const limit = Joi.number().integer().min(1).max(100);
const products = Joi.array().items(Joi.number().integer());

/**
 * @description Create category schema
 * @type {Joi.ObjectSchema} createCategorySchema
 * @property {string} name - Category name
 * @property {string} image - Category image
 * @property {Array} products - Category products
 * @property {number} products.id - Product id
 * @property {number} products.price - Product price
 * @returns {Joi.ValidationResult} - Result of validation
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { createCategorySchema } = require('./schemas/category.schema');
 * const { error, value } = createCategorySchema.validate({
 *  "name": "Category name",
 *  "image": "https://example.com/image.jpg",
 *  "products": [
 *   {
 *    "id": 1,
 *    "price": 100
 *   }]
 * });
 * if (error) {
 *  // Handle error
 * }
 * if (value) {
 * // Handle value
 * }
 * // value is {
 * //  "name": "Category name",
 * //  "image": "https://example.com/image.jpg",
 * //  "products": [
 * //   {
 * //    "id": 1,
 * //    "price": 100
 * //   }]
 * // }
 */
const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required(),
  products: products
});

/**
 * @description Update category schema
 * @type {Joi.ObjectSchema} updateCategorySchema
 * @property {string} name - Category name
 * @property {string} image - Category image
 * @property {Array} products - Category products
 * @property {number} products.id - Product id
 * @property {number} products.price - Product price
 * @returns {Joi.ValidationResult} - Result of validation
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { updateCategorySchema } = require('./schemas/category.schema');
 * const { error, value } = updateCategorySchema.validate({
 *  "name": "Category name",
 *  "image": "https://example.com/image.jpg",
 *  "products": [
 *   {
 *    "id": 1,
 *    "price": 100
 *   }]
 * });
 * if (error) {
 *  // Handle error
 * }
 * if (value) {
 * // Handle value
 * }
 * // value is { name: 'Category name', image: 'https://example.com/image.jpg', products: [ { id: 1, price: 100 } ] }
 */
const updateCategorySchema = Joi.object({
  name: name,
  image: image,
  products: products
});

/**
 * @description Get category schema
 * @type {Joi.ObjectSchema} getCategorySchema
 * @property {number} id - Category id
 * @returns {Joi.ValidationResult} - Result of validation
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { getCategorySchema } = require('./schemas/category.schema');
 * const { error, value } = getCategorySchema.validate({
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
const getCategorySchema = Joi.object({
  id: id.required(),
});

/**
 * @description Query category schema
 * @type {Joi.ObjectSchema} queryCategorySchema
 * @property {number} offset - Offset
 * @property {number} limit - Limit
 * @property {string} name - Category name
 * @returns {Joi.ValidationResult} - Result of validation
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { queryCategorySchema } = require('./schemas/category.schema');
 * const { error, value } = queryCategorySchema.validate({
 *  "offset": 0,
 *  "limit": 10,
 *  "name": "Category name"
 * });
 * if (error) {
 * // Handle error
 * }
 * if (value) {
 * // Handle value
 * }
 * // value is { offset: 0, limit: 10, name: 'Category name' }
 */
const queryCategorySchema = Joi.object({
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
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema, queryCategorySchema }