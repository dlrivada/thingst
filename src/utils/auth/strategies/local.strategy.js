/**
 * @fileoverview Local strategy for passport authentication
 * @author {author} dlrivada <{@mail dlrivada@hotmail.com}> ({@link http://dlrivada.com})
 * @module utils/auth/strategies/local.strategy
 * @requires @hapi/boom
 * @requires bcrypt
 * @requires ./../../../services/user.service
 * @see {@link https://www.npmjs.com/package/@hapi/boom| @hapi/boom}
 * @see {@link https://www.npmjs.com/package/bcrypt| bcrypt}
 * @see {@link https://www.npmjs.com/package/passport-local| passport-local}
 * @see {@link https://www.npmjs.com/package/passport| passport}
 */
const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('./../../../services/user.service');
const service = new UserService();

/**
 * @description Local strategy for passport authentication
 * @function LocalStrategy
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * const LocalStrategy = require('./utils/auth/strategies/local.strategy');
 * passport.use(LocalStrategy);
 * @see {@link https://www.npmjs.com/package/passport-local| passport-local}
 * @see {@link https://www.npmjs.com/package/passport| passport}
 * @see {@link https://www.npmjs.com/package/bcrypt| bcrypt}
 * @see {@link https://www.npmjs.com/package/@hapi/boom| @hapi/boom}
 * @see {@link https://www.npmjs.com/package/sequelize| sequelize}
 * @see {@link https://www.npmjs.com/package/sequelize#query-interface| sequelize query interface}
 * @see {@link https://www.npmjs.com/package/sequelize#model-instances| sequelize model instances}
 * @see {@link https://www.npmjs.com/package/sequelize#model-querying-basics| sequelize model querying basics}
 * @see {@link https://www.npmjs.com/package/@hapi/boom| @hapi/boom}
 * @see {@link https://www.npmjs.com/package/bcrypt| bcrypt}
 * @see {@link https://www.npmjs.com/package/passport-local| passport-local}
 * @see {@link https://www.npmjs.com/package/passport| passport}
 */
const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);
      if (!user) {
        done(boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;