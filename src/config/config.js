/**
 * @file - Configuration file for the application environment variables and constants
 * @author {author} dlrivada <{dlrivada@hotmail.com}> ({http://dlrivada.com})
 * @module config/config
 * @requires dotenv
 * @see {@link https://www.npmjs.com/package/dotenv| dotenv}
 * @see {@link https://www.npmjs.com/package/dotenv#usage| dotenv usage}
 * @see {@link https://www.npmjs.com/package/dotenv#what-happens-to-environment-variables-that-were-already-set| dotenv what happens to environment variables that were already set}
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * const config = require('./config/config');
 */

require('dotenv').config();

/**
 * @typedef {Object} Config - Configuration object for the application environment variables and constants 
 * @property {string} env - Environment variable NODE_ENV or 'development' by default 
 * @property {number} port - Environment variable PORT or 3000 by default
 * @property {string} dbUser - Environment variable PGUSER
 * @property {string} dbPassword - Environment variable PGPASSWORD
 * @property {string} dbHost - Environment variable PGHOST
 * @property {string} dbName - Environment variable PGDATABASE
 * @property {string} dbPort - Environment variable PGPORT
 * @see {@link https://www.npmjs.com/package/dotenv| dotenv}
 * @see {@link https://www.npmjs.com/package/dotenv#usage| dotenv usage}
 * @see {@link https://www.npmjs.com/package/dotenv#what-happens-to-environment-variables-that-were-already-set| dotenv what happens to environment variables that were already set}
 */
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  dbUser:  process.env.PGUSER,
  dbPassword:  process.env.PGPASSWORD,
  dbHost:  process.env.PGHOST,
  dbName:  process.env.PGDATABASE,
  dbPort:  process.env.PGPORT,
  apiKey: process.env.API_KEY
}

module.exports = { config };