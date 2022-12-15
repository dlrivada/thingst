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
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: 3600,           // 1 hour
  jwtRefreshExpiration: 86400,   // 24 hours

  /* for test */
  // jwtExpiration: 60,          // 1 minute
  // jwtRefreshExpiration: 120,  // 2 minutes

  // mailer
  mailerService: process.env.MAILER_SERVICE_PROVIDER,
  mailerUser: process.env.MAILER_USER,
  mailerPassword: process.env.MAILER_PASSWORD,
  mailerEmail: process.env.MAILER_EMAIL,
  mailerName: process.env.MAILER_NAME,
  mailerPort: process.env.MAILER_PORT,
  mailerHost: process.env.MAILER_HOST,
  mailerSecure: process.env.MAILER_SECURE,
  mailerRequireTLS: process.env.MAILER_REQUIRE_TLS,
  mailerRequireSSL: process.env.MAILER_REQUIRE_SSL,
  mailerFrom: process.env.MAILER_FROM,
  mailerTo: process.env.MAILER_TO,
  mailerSubject: process.env.MAILER_SUBJECT,
  mailerText: process.env.MAILER_TEXT,
  mailerHtml: process.env.MAILER_HTML,
  mailerAttachments: process.env.MAILER_ATTACHMENTS,
  mailerBcc: process.env.MAILER_BCC,
  mailerCc: process.env.MAILER_CC,
  mailerReplyTo: process.env.MAILER_REPLY_TO,
  mailerInReplyTo: process.env.MAILER_IN_REPLY_TO,
  mailerReferences: process.env.MAILER_REFERENCES,
  mailerList: process.env.MAILER_LIST,
  mailerPriority: process.env.MAILER_PRIORITY,
  mailerXMailer: process.env.MAILER_X_MAILER,
  mailerXPriority: process.env.MAILER_X_PRIORITY,
  mailerXMSMailPriority: process.env.MAILER_X_MSMAIL_PRIORITY,
  mailerXMailer: process.env.MAILER_X_MAILER,

  host: process.env.HOST,
  hostUrl: process.env.HOST_URL,
  hostUrlApi: process.env.HOST_URL_API,
  hostUrlApiV1: process.env.HOST_URL_API_V1,
  hostUrlApiV1Auth: process.env.HOST_URL_API_V1_AUTH,
  
}

module.exports = { config };