/**
 * @fileoverview Sequelize instance
 * @author {author} dlrivada <{dlrivada@hotmail.com}> ({http://dlrivada.com})
 * @module libs/sequelize
 * @requires sequelize
 * @requires ./../config/config
 * @requires ./../mocks
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * const sequelize = require('./libs/sequelize');
 * const { User } = sequelize.models;
 */

const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const setupModels = require('./../mocks');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});

/**
 * @function setupModels - Setup models for Sequelize instance 
 * @param {Sequelize} sequelize - Sequelize instance
 * @version 1.0.0
 * @since 1.0.0
 * @memberof module:libs/sequelize
 * @example
 * const sequelize = require('./libs/sequelize');
 * const { User } = sequelize.models;
 * const user = await User.create({ name: 'John Doe' });
 * const users = await User.findAll();
 * @see {@link https://sequelize.org/master/manual/model-basics.html| Model Basics}
 * @see {@link https://sequelize.org/master/manual/model-querying-basics.html| Model Querying Basics}
 * @see {@link https://sequelize.org/master/manual/model-instances.html| Model Instances}
 * @see {@link https://sequelize.org/master/manual/validations-and-constraints.html| Validations and Constraints}
 * @see {@link https://sequelize.org/master/manual/associations.html| Associations}
 * @see {@link https://sequelize.org/master/manual/transactions.html| Transactions}
 * @see {@link https://sequelize.org/master/manual/upgrade-to-v5.html| Upgrade to v5}
 * @see {@link https://sequelize.org/master/manual/upgrade-to-v6.html| Upgrade to v6}
 */
setupModels(sequelize);

module.exports = sequelize;