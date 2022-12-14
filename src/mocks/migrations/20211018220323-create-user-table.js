'use strict';

const { USER_TABLE } = require('./../models/user.model');
const { UserSchema } = require('./../models/user.schema');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
  }
};