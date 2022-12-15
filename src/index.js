/**
 * @file index.js - Mocks module entry point for the application. This file is used to setup the mock data for the application. 
 * @author {author} dlrivada <{@mail mailto:dlrivada@hotmail.com}> ({@link http://dlrivada.com})
 * @module mocks - Mocks module entry point for the application. This file is used to setup the mock data for the application. 
 * @requires mocks/models/order.model - Mocks module entry point for the application. This file is used to setup the mock data for the application. 
 */

const server = require('./config/config');
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
// Body parser
app.use(express.json());

// CORS
const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

require('./utils/auth');

// Rutas
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

// Rutas API
routerApi(app);

//app.use(verifyToken);
// Error handler
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Iniciar servidor
if (server.config.mode !== 'test')
    app.listen(server.config.port, () => console.log(`⬢ Server Thingst - ${server.config.env}`));
export default app;