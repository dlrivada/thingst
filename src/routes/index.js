/**  
 * @fileoverview Archivo de rutas de la API. 
 * @author {author} dlrivada <{dlrivada@hotmail.com}> ({http://dlrivada.com})  
 * @requires express 
 * @requires products.router 
 * @requires categories.router 
 * @requires users.router 
 * @requires orders.router 
 * @requires orderline.router 
 * @requires customers.router 
 * @exports routerApi 
 * @version 1.0.0 
 * @since 1.0.0 
 * @example
 * const routerApi = require('./routes/index');
 */

const express = require('express');

// Importar todos los routers;
const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const orderRouter = require('./orders.router');
const customersRouter = require('./customers.router');
const orderlineRouter = require('./orderline.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');

/**
 * @description Función que inicializa las rutas de la API
 * @function routerApi
 * @param {object} app - Objeto de express
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * const routerApi = require('./routes/index');
 * routerApi(app);
 * @see {@link https://www.npmjs.com/package/express| express}
 * @see {@link https://www.npmjs.com/package/express#express| express}
 * @see {@link https://www.npmjs.com/package/express#app| express app}
 * @see {@link https://www.npmjs.com/package/express#router| express router}
 * @see {@link https://www.npmjs.com/package/express#expressrouter| express expressRouter}
 */
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/orders', orderRouter);
  router.use('/orderlines', orderlineRouter);
  router.use('/customers', customersRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
}

module.exports = routerApi;