/**
 * @fileoverview This file is the entry point for all models.
 * @author {author} <{dlrivada@hotmail.com}> ({http://dlrivada.com})
 * @requires fs
 * @requires path
 * @requires sequelize
 * @requires sequelize/lib/data-types
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * import { sequelize } from './models';
 * sequelize.sync();
 * @module models
 * @see {@link https://sequelize.org/master/manual/model-basics.html| Sequelize Model Basics}
 * @see {@link https://sequelize.org/master/manual/model-querying-basics.html| Sequelize Model Querying Basics}
 * @see {@link https://sequelize.org/master/manual/model-instances.html| Sequelize Model Instances}
 * @see {@link https://sequelize.org/master/manual/validations-and-constraints.html| Sequelize Validations and Constraints}
 * @see {@link https://sequelize.org/master/manual/associations.html| Sequelize Associations}
 * @see {@link https://sequelize.org/master/manual/transactions.html| Sequelize Transactions}
 * @see {@link https://sequelize.org/master/manual/upgrade-to-v5.html| Sequelize Upgrade to v5}
 * @see {@link https://sequelize.org/master/manual/upgrade-to-v6.html| Sequelize Upgrade to v6}
 */

'use strict';

import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import Sequelize, { DataTypes } from 'sequelize';
const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../src/mocks/config')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;