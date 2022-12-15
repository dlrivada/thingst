/**
 * @fileoverview Role model object with fields and properties for each field in the table schema for the Role model in the database 
 * @module models/role.model 
 * @author {author} dlrivada <{dlrivada@hotmail.com}> ({http://dlrivada.com})
 * @requires sequelize
 * @requires sequelize/lib/data-types
 * @requires sequelize/lib/sequelize
 * @requires {@link module:config/config}
 * @requires {@link module:config/constants}
 * @see {@link module:models/role.model~Role}
 * @see {@link module:models/role.model~RoleSchema}
 * @see {@link module:models/role.model~ROLE_TABLE}
 * @see {@link module:models/role.model~ROLES}
 * @see {@link module:models/role.model~associate}
 * @see {@link module:models/role.model~config}
 */

const { Model, DataTypes, Sequelize, ENUM } = require('sequelize');

const ROLE_TABLE = 'roles';
const ROLES = ["user", "admin", "moderator"];

const RoleSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: ENUM(ROLES),
    allowNull: false,
    defaultValue: ROLES[0],
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
}

class Role extends Model {

  static associate(models) {
    this.belongsToMany(models.User, {
      through: 'user_roles',
      as: 'users',
      foreignKey: 'roleId',
      otherKey: 'userId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLE_TABLE,
      modelName: 'Role',
      timestamps: false
    }
  }
}

module.exports = { Role, RoleSchema, ROLE_TABLE, ROLES };