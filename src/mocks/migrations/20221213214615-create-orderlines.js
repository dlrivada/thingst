'use strict';
const { DataTypes } = require('sequelize');

const { OrderLineSchema, ORDER_LINE_TABLE } = require('./../models/orderline.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ORDER_LINE_TABLE, OrderLineSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDER_LINE_TABLE);
  }
};
