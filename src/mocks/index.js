/** 
 * @module mocks/index 
 * @author {author} dlrivada <{dlrivada@hotmail.com}> ({http://dlrivada.com})
 * @description Mocks index module
 * @requires mocks/models/user.model
 * @requires mocks/models/user.schema
 * @requires mocks/models/customer.model
 * @requires mocks/models/category.model
 * @requires mocks/models/product.model
 * @requires mocks/models/order.model
 * @requires mocks/models/orderline.model
 * @see {@link User}
 * @see {@link Customer}
 * @see {@link Category}
 * @see {@link Product}
 * @see {@link Order}
 * @see {@link OrderLine}
 * @see {@link setupModels}
 * @see {@link setupAssociations}
 * @see {@link setupSequelize}
 * @see {@link setup}
 * @see {@link setupMockData}
 * @see {@link setupMockDataForTests}
 * @see {@link setupMockDataForDevelopment}
 * @see {@link setupMockDataForProduction}
 * @see {@link setupMockDataForStaging}
 * @see {@link setupMockDataForTesting}
 * @see {@link setupMockDataForCI}
 * @see {@link setupMockDataForCD}
 * @see {@link setupMockDataForQA}
 * @see {@link setupMockDataForUAT}
 * @see {@link setupMockDataForSIT}
 * @see {@link setupMockDataForPilot}
 * @see {@link setupMockDataForDemo}
 * @see {@link setupMockDataForTraining}
 * @see {@link setupMockDataForPreProduction}
 * @see {@link setupMockDataForPostProduction}
 * @see {@link setupMockDataForProductionLike}
 * @see {@link setupMockDataForProductionReady}
 * @see {@link setupMockDataForProductionStable}
 * @see {@link setupMockDataForProductionLive}
 * @see {@link setupMockDataForProductionHotfix}
 * @see {@link setupMockDataForProductionMaintenance}
 * @see {@link setupMockDataForProductionSupport}
 * @see {@link setupMockDataForProductionCritical}
 * @see {@link setupMockDataForProductionEmergency}
 * @see {@link setupMockDataForProductionShutdown}
 * @see {@link setupMockDataForProductionDown}
 * @see {@link setupMockDataForProductionOutage}
 * @see {@link setupMockDataForProductionFailure}
 * @see {@link setupMockDataForProductionDisaster}
 * @see {@link setupMockDataForProductionCatastrophe}
 * @see {@link setupMockDataForProductionApocalypse}
 * @see {@link setupMockDataForProductionArmageddon}
 * @see {@link setupMockDataForProductionDoomsday}
 * @see {@link setupMockDataForProductionEndOfTheWorld}
 * @see {@link setupMockDataForProductionNuclearWinter}
 * @see {@link setupMockDataForProductionZombieApocalypse}
 * @see {@link setupMockDataForProductionAlienInvasion}
 * @see {@link setupMockDataForProductionAlienAttack}
 * @see {@link setupMockDataForProductionAlienAbduction}
 * @see {@link setupMockDataForProductionAlienIntrusion}
 * @see {@link setupMockDataForProductionAlienIncursion}
 * @see {@link setupMockDataForProductionAlienConquest}
 * @see {@link setupMockDataForProductionAlienOverlord}
 */  
// JSDoc module declaration for this file (src\mocks\index.js)  
// Path: src\mocks\index.js

const { User } = require('./models/user.model');
const { UserSchema } = require('./models/user.schema');
const { Customer, CustomerSchema } = require('./models/customer.model');
const { Category, CategorySchema } = require('./models/category.model');
const { Product, ProductSchema } = require('./models/product.model');
const { Order, OrderSchema } = require('./models/order.model');
const { OrderLine, OrderLineSchema } = require('./models/orderline.model');

/**
 * Setup models and associations for sequelize instance and models object in the app context object (app.locals) 
 * @param {Sequelize} sequelize - Sequelize instance 
 * @returns {void} - Nothing is returned 
 * @private
 * @readonly
 * @since 1.0.0
 * @version 1.0.0
 */
function setupModels(sequelize) {
  // Setup models
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderLine.init(OrderLineSchema, OrderLine.config(sequelize));
  // Setup associations
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
  OrderLine.associate(sequelize.models);
}

module.exports = setupModels;