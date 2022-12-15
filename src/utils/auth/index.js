/**
 * @fileoverview Authentication module
 * @author {author} dlrivada <{@mail dlrivada@hotmail.com}> ({@link http://dlrivada.com})
 * @module utils/auth
 * @requires @hapi/boom
 * @requires ./../libs/sequelize
 * @requires ./../utils/auth/strategies/local.strategy
 * @requires ./../utils/auth/strategies/jwt.strategy
 * @see {@link https://www.npmjs.com/package/@hapi/boom| @hapi/boom}
 * @see {@link https://www.npmjs.com/package/sequelize| sequelize}
 * @see {@link https://www.npmjs.com/package/sequelize#query-interface| sequelize query interface}
 * @see {@link https://www.npmjs.com/package/sequelize#model-instances| sequelize model instances}
 * @see {@link https://www.npmjs.com/package/sequelize#model-querying-basics| sequelize model querying basics}
 * @see {@link https://www.npmjs.com/package/passport| passport}
 * @see {@link https://www.npmjs.com/package/passport-local| passport-local}
 * @see {@link https://www.npmjs.com/package/passport-jwt| passport-jwt}
 */
const passport = require('passport');

const LocalStrategy = require('./strategies/local.strategy');

/**
 * @description Initialize passport
 * @function init
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * const auth = require('./utils/auth');
 * auth.init();
 * @see {@link https://www.npmjs.com/package/passport| passport}
 * @see {@link https://www.npmjs.com/package/passport-local| passport-local}
 */
passport.use(LocalStrategy);