/**
 * @fileoverview Postgres connection
 * @author {author} dlrivada <{dlrivada@hotmail.com}> ({http://dlrivada.com})
 * @module libs/postgres
 * @requires pg
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * const getConnection = require('./libs/postgres');
 * const client = await getConnection();
 */

const { Client } = require('pg');

/**
 * @description Get a new connection to postgres
 * @method libs/postgres.getConnection()
 * @methoddesc Get a new connection to postgres
 * @returns {Object} Postgres client
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * const getConnection = require('./libs/postgres');
 * const client = await getConnection();
 * @async
 * @function
 * @name getConnection
 * @memberof module:libs/postgres
 * @inner
 * @returns {Object} Postgres client
 * @throws {Error} If connection fails
 * @see {@link https://node-postgres.com/features/connecting| node-postgres}
 * @see {@link https://node-postgres.com/features/pooling| node-postgres}
 * @see {@link https://node-postgres.com/features/queries| node-postgres}
 * @see {@link https://node-postgres.com/features/transactions| node-postgres}
 * @see {@link https://node-postgres.com/features/async-await| node-postgres}
 * @see {@link https://node-postgres.com/features/cursor| node-postgres}
 * @see {@link https://node-postgres.com/features/prepared-statements| node-postgres}
 * @see {@link https://node-postgres.com/features/streams| node-postgres}
 * @see {@link https://node-postgres.com/features/ssl| node-postgres}
 * @see {@link https://node-postgres.com/features/notifications| node-postgres}
 * @see {@link https://node-postgres.com/features/replication| node-postgres}
 * @see {@link https://node-postgres.com/features/ssl| node-postgres}
 */ 
async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'nico',
    password: 'admin123',
    database: 'my_store'
  });
  await client.connect();
  return client;
}

module.exports = getConnection;