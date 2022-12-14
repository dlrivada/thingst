/** 
 * @module mocks/config 
 * @author {author} dlrivada <{dlrivada@hotmail.com}> ({http://dlrivada.com})
 * @description Mocks configuration module
 * @requires config/config
 * @requires sequelize
 * @requires sequelize/lib/data-types
 * @requires sequelize/lib/sequelize
 * @requires sequelize/lib/sequelize/associations
 * @requires sequelize/lib/sequelize/associations/base
 * @requires sequelize/lib/sequelize/associations/belongs-to
 * @requires sequelize/lib/sequelize/associations/belongs-to-many
 * @requires sequelize/lib/sequelize/associations/has-many
 * @requires sequelize/lib/sequelize/associations/has-one
 * @requires sequelize/lib/sequelize/associations/mixin
 * @requires sequelize/lib/sequelize/associations/has-many-dual
 * @requires sequelize/lib/sequelize/associations/has-many-through
 * @requires sequelize/lib/sequelize/associations/has-one-dual
 * @requires sequelize/lib/sequelize/associations/has-one-through
 * @requires sequelize/lib/sequelize/associations/belongs-to-many-dual
 * @requires sequelize/lib/sequelize/associations/belongs-to-many-through
 * @requires sequelize/lib/sequelize/associations/belongs-to-dual
 * @requires sequelize/lib/sequelize/associations/belongs-to-through
 */ 
// JSDoc module declaration for this file (src\mocks\config.js)

const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

/**
 * @typedef {Object} SequelizeConfig - Configuration object for the Sequelize ORM 
 * @property {string} url - Database connection string 
 * @property {string} dialect - Database dialect
 * @property {Object} dialectOptions - Database dialect options
 * @property {Object} pool - Database connection pool
 * @property {number} pool.max - Database connection pool max size
 * @property {number} pool.min - Database connection pool min size
 * @property {number} pool.acquire - Database connection pool acquire timeout
 * @property {number} pool.idle - Database connection pool idle timeout
 * @property {boolean} logging - Database logging
 * @property {boolean} benchmark - Database benchmark
 * @property {boolean} retry - Database retry
 * @property {boolean} retry.max - Database retry max
 * @property {boolean} retry.match - Database retry match
 * @property {boolean} retry.backoffBase - Database retry backoff base
 * @property {boolean} retry.backoffExponent - Database retry backoff exponent
 * @property {boolean} retry.timeout - Database retry timeout
 * @property {boolean} retry.maxTimeout - Database retry max timeout
 * @property {boolean} retry.forever - Database retry forever
 * @property {boolean} retry.unref - Database retry unref
 * @property {boolean} retry.varyNoStatusCodes - Database retry vary no status codes
 * @property {boolean} retry.varyNoRetryAfter - Database retry vary no retry after
 */
module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
  }
}