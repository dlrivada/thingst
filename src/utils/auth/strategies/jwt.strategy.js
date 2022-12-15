/**
 * @fileoverview JWT strategy for Passport
 * @author {author} dlrivada <{dlrivada@hotmail.com}> ({http://dlrivada.com})
 * @module utils/auth/strategies/jwt.strategy
 * @requires passport-jwt
 * @requires config
 * @see {@link https://www.npmjs.com/package/passport-jwt| passport-jwt}
 * @see {@link https://www.npmjs.com/package/passport-jwt#extracting-the-jwt-from-the-request| passport-jwt extracting the jwt from the request}
 * @see {@link https://www.npmjs.com/package/passport-jwt#configuring-strategy| passport-jwt configuring strategy}
 * @see {@link https://www.npmjs.com/package/passport-jwt#verify-callback| passport-jwt verify callback}
 */

const { Strategy, ExtractJwt } = require('passport-jwt');

const { config } = require('../../../config/config');

// Setup work and export for the JWT passport strategy
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

/**
 * @class JwtStrategy
 * @classdesc JWT strategy for Passport
 * @param {Object} options - Options for the strategy
 * @param {Object} payload - Payload from the JWT
 * @param {Function} done - Callback function
 * @returns {Function} done - Callback function
 * @see {@link https://www.npmjs.com/package/passport-jwt#extracting-the-jwt-from-the-request| passport-jwt extracting the jwt from the request}
 * @see {@link https://www.npmjs.com/package/passport-jwt#configuring-strategy| passport-jwt configuring strategy}
 * @see {@link https://www.npmjs.com/package/passport-jwt#verify-callback| passport-jwt verify callback}
 * @example
 * const JwtStrategy = require('./utils/auth/strategies/jwt.strategy');
 * const passport = require('passport');
 * passport.use(JwtStrategy);
 */
const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

module.exports = JwtStrategy;