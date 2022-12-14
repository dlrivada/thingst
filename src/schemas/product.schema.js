const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const { createCategorySchema, updateCategorySchema } = require('./category.schema');
const offset = Joi.number().integer().min(0);
const limit = Joi.number().integer().min(1).max(100);
const price_min = Joi.number().integer().min(10);
const price_max = Joi.number().integer().min(10);
const category_id = Joi.string().uuid();
const category_name = Joi.string().min(3).max(15);

/**
 * @description Create product schema
 * @type {Joi.ObjectSchema} createProductSchema
 * @property {string} name - Product name
 * @property {number} price - Product price
 * @property {string} description - Product description
 * @property {string} image - Product image
 * @property {Object} category - Product category
 * @returns {Joi.ValidationResult} - Result of validation
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { createProductSchema } = require('./schemas/product.schema');
 * const { error, value } = createProductSchema.validate({
 *  "name": "Product name",
 *  "price": 100,
 *  "description": "Product description",
 *  "image": "https://example.com/image.jpg",
 *  "category": {
 *   "id": "1",
 *   "name": "Category name"
 *  }
 * });
 * if (error) {
 * // Handle error
 * }
 * if (value) {
 * // Handle value
 * }
 * // value is {
 * //  "name": "Product name",
 * //  "price": 100,
 * //  "description": "Product description",
 * //  "image": "https://example.com/image.jpg",
 * //  "category": {
 * //   "id": "1",
 * //   "name": "Category name"
 * //  }
 * // }
 */
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  category: createCategorySchema
});

/**
 * @description Update product schema
 * @type {Joi.ObjectSchema} updateProductSchema
 * @property {string} name - Product name
 * @property {number} price - Product price
 * @property {string} description - Product description
 * @property {string} image - Product image
 * @property {Object} category - Product category
 * @returns {Joi.ValidationResult} - Result of validation
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { updateProductSchema } = require('./schemas/product.schema');
 * const { error, value } = updateProductSchema.validate({
 *  "name": "Product name",
 *  "price": 100,
 *  "description": "Product description",
 *  "image": "https://example.com/image.jpg",
 *  "category": {
 *   "id": "1",
 *   "name": "Category name"
 *  }
 * });
 * if (error) {
 * // Handle error
 * }
 * if (value) {
 * // Handle value
 * }
 * // value is {
 * //  "name": "Product name",
 * //  "price": 100,
 * //  "description": "Product description",
 * //  "image": "https://example.com/image.jpg",
 * //  "category": {
 * //   "id": "1",
 * //   "name": "Category name"
 * //  }
 * // }
 */
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description,
  category: updateCategorySchema
});

/**
 * @description Get product schema
 * @type {Joi.ObjectSchema} getProductSchema
 * @property {string} id - Product id
 * @returns {Joi.ValidationResult} - Result of validation
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example
 * const { getProductSchema } = require('./schemas/product.schema');
 * const { error, value } = getProductSchema.validate({
 *  "id": "1"
 * });
 * if (error) {
 * // Handle error
 * }
 * if (value) {
 * // Handle value
 * }
 * // value is {
 * //  "id": "1"
 * // }
 */
const getProductSchema = Joi.object({
  id: id.required(),
});

/**
 * @description Query product schema
 * @type {Joi.ObjectSchema} queryProductSchema
 * @property {number} offset - Offset of query
 * @property {number} limit - Limit of query
 * @property {number} price - Price of product
 * @property {number} price_min - Min price of product
 * @property {number} price_max - Max price of product
 * @property {string} name - Name of product
 * @property {string} description - Description of product
 * @property {string} category_id - Category id of product
 * @property {string} category_name - Category name of product
 * @returns {Joi.ValidationResult} - Result of validation
 * @returns {Joi.ValidationError} error - Error of validation
 * @returns {Joi.ValidationError} value - Value of validation
 * @throws {Joi.ValidationError} - If validation fails
 * @example 
 * const { querySchema } = require('./schemas/product.schema');
 * const { error, value } = querySchema.validate({
 * "offset": 0,
 * "limit": 10,
 * "price": 100,
 * "price_min": 100,
 * "price_max": 1000,
 * "name": "Product name",
 * "description": "Product description",
 * "category_id": "1",
 * "category_name": "Category name"
 * });
 * if (error) {
 * // Handle error
 * }
 * if (value) {
 * // Handle value
 * }
 * // value is {
 * //  "offset": 0,
 * //  "limit": 10,
 * //  "price": 100,
 * //  "price_min": 100,
 * //  "price_max": 1000,
 * //  "name": "Product name",
 * //  "description": "Product description",
 * //  "category_id": "1",
 * //  "category_name": "Category name"
 * // }
 */
const queryProductSchema = Joi.object({
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
  price,  
  price_min: price_min.when('price_max', {
    is: Joi.exist(),
    then: Joi.number().integer().max(Joi.ref('price_max')),
    otherwise: Joi.number().integer().min(10)
  }),
  price_max: price_max.when('price_min', {
    is: Joi.exist(),
    then: Joi.number().integer().min(Joi.ref('price_min')),
    otherwise: Joi.number().integer().min(10)
  }),
  name,
  description,
  category_id: category_id.when('category_name', {
    is: Joi.exist(),
    then: Joi.string().uuid(),
    otherwise: Joi.string().uuid().required()
  }),
  category_name: Joi.string().min(3).max(15).when('category_id', {
    is: Joi.exist(),
    then: Joi.string().min(3).max(15),
    otherwise: Joi.string().min(3).max(15).required()
  })
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }