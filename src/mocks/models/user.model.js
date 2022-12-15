/** 
 * @module models/user.model.js 
 * @requires sequelize
 * @requires sequelize/lib/model
 * @requires sequelize/lib/data-types
 * @requires sequelize/lib/sequelize
 * @requires sequelize/lib/sequelize/associations
 * @requires sequelize/lib/sequelize/associations/base
 * @requires sequelize/lib/sequelize/associations/belongs-to
 * @requires sequelize/lib/sequelize/associations/belongs-to-many
 * @requires sequelize/lib/sequelize/associations/has-many
 * @requires sequelize/lib/sequelize/associations/has-one
 * @see {@link https://sequelize.org/master/class/lib/model.js~Model.html| Sequelize Model}
 * @see {@link https://sequelize.org/master/class/lib/data-types.js~DataTypes.html| Sequelize DataTypes}
 * @see {@link https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html| Sequelize}
 * @see {@link https://sequelize.org/master/class/lib/sequelize/associations/index.js~Associations.html| Sequelize Associations}
 * @see {@link https://sequelize.org/master/class/lib/sequelize/associations/base.js~BaseAssociation.html| Sequelize BaseAssociation}
 * @see {@link https://sequelize.org/master/class/lib/sequelize/associations/belongs-to.js~BelongsTo.html| Sequelize BelongsTo}
 * @see {@link https://sequelize.org/master/class/lib/sequelize/associations/belongs-to-many.js~BelongsToMany.html| Sequelize BelongsToMany}
 * @see {@link https://sequelize.org/master/class/lib/sequelize/associations/has-many.js~HasMany.html| Sequelize HasMany}
 * @see {@link https://sequelize.org/master/class/lib/sequelize/associations/has-one.js~HasOne.html| Sequelize HasOne}
 * @see {@link https://sequelize.org/master/class/lib/sequelize/associations/mixin.js~AssociationMixin.html| Sequelize AssociationMixin}
 * @see {@link https://sequelize.org/master/class/lib/sequelize/associations/mixin.js~AssociationMixinOptions.html| Sequelize AssociationMixinOptions}
 * @see {@link https://sequelize.org/master/class/lib/sequelize/associations/mixin.js~AssociationOptionsBelongsTo.html| Sequelize AssociationOptionsBelongsTo}
 * @see {@link https://sequelize.org/master/class/lib/sequelize/associations/mixin.js~AssociationOptionsBelongsToMany.html| Sequelize AssociationOptionsBelongsToMany}
 * @see {@link https://sequelize.org/master/class/lib/sequelize/associations/mixin.js~AssociationOptionsHasMany.html| Sequelize AssociationOptionsHasMany}
 * @see {@link https://sequelize.org/master/class/lib/sequelize/associations/mixin.js~AssociationOptionsHasOne.html| Sequelize AssociationOptionsHasOne}
 * @see {@link https://sequelize.org/master/class/lib/sequelize/associations/mixin.js~AssociationOptionsHasOneGetAssociation.html| Sequelize AssociationOptionsHasOneGetAssociation}
 */
// Description: User model object with fields and properties for each field in the table schema for the User model in the database 

const { Model } = require('sequelize');

/**
 * @constant {string} USER_TABLE - Table name for the User model in the database 
 * @description Table name for the User model in the database 
 * @default 'users' 
 * @type {string} USER_TABLE - Table name for the User model in the database 
 * @memberof User 
 * @inner
 * @private 
 * @readonly 
 * @since 1.0.0 
 * @version 1.0.0 
 * @see {@link User} 
 * @see {@link UserSchema} 
 * @see {@link User.config} 
 * @see {@link User.associate} 
 * @see {@link User.init} 
 * @see {@link UserTable}
 * @see {@link UserSchema.id}
 * @see {@link UserSchema.email}
 * @see {@link UserSchema.password}
 * @see {@link UserSchema.role}
 * @see {@link UserSchema.createdAt}
 * @see {@link UserSchema.updatedAt}
 * @see {@link UserSchema.deletedAt}
 * @see {@link UserSchema.version}
 * @see {@link UserSchema.lastLogin}
 * @see {@link UserSchema.lastLogout}
 * @see {@link UserSchema.lastActivity}
 * @see {@link UserSchema.lastIp}
 * @see {@link UserSchema.lastUserAgent}
 * @see {@link UserSchema.lastLocation}
 * @see {@link UserSchema.lastLocationLat}
 * @see {@link UserSchema.lastLocationLng}
 * @see {@link UserSchema.lastLocationCity}
 * @see {@link UserSchema.lastLocationState}
 * @see {@link UserSchema.lastLocationCountry}
 * @see {@link UserSchema.lastLocationZip}
 * @see {@link UserSchema.lastLocationTimezone}
 * @see {@link UserSchema.lastLocationIsp}
 * @see {@link UserSchema.lastLocationOrg}
 * @see {@link UserSchema.lastLocationAs}
 * @see {@link UserSchema.lastLocationAsname}
 * @see {@link UserSchema.lastLocationReverse}
 * @see {@link UserSchema.lastLocationMobile}
 * @see {@link UserSchema.lastLocationProxy}
 * @see {@link UserSchema.lastLocationHosting}
 * @see {@link UserSchema.lastLocationQuery}
 * @see {@link UserSchema.lastLocationStatus}
 * @see {@link UserSchema.lastLocationMessage}
 * @see {@link UserSchema.lastLocationCountryCode}
 * @see {@link UserSchema.lastLocationRegion}
 * @see {@link UserSchema.lastLocationRegionName}
 */
const USER_TABLE = 'users';


/**
 * @constant {object} UserSchema - Table schema object with fields and properties for each field in the table schema for the User model in the database
 * @description Table schema
 * @type {object} UserSchema - Table schema object with fields and properties for each field in the table schema for the User model in the database
 * @memberof User
 * @inner
 * @private
 * @readonly
 * @since 1.0.0
 * @version 1.0.0
 * @see {@link User}
 * @see {@link User.config}
 * @see {@link User.associate}
 * @see {@link User.init}
 * @see {@link UserTable}
 * @see {@link UserSchema.id}
 * @see {@link UserSchema.email}
 * @see {@link UserSchema.password}
 * @see {@link UserSchema.role}
 * @see {@link UserSchema.createdAt}
 * @see {@link UserSchema.updatedAt}
 * @see {@link UserSchema.deletedAt}
 * @see {@link UserSchema.version}
 * @see {@link UserSchema.lastLogin}
 * @see {@link UserSchema.lastLogout}
 * @see {@link UserSchema.lastActivity}
 * @see {@link UserSchema.lastIp}
 * @see {@link UserSchema.lastUserAgent}
 * @see {@link UserSchema.lastLocation}
 * @see {@link UserSchema.lastLocationLat}
 * @see {@link UserSchema.lastLocationLng}
 * @see {@link UserSchema.lastLocationCity}
 * @see {@link UserSchema.lastLocationState}
 * @see {@link UserSchema.lastLocationCountry}
 * @see {@link UserSchema.lastLocationZip}
 * @see {@link UserSchema.lastLocationTimezone}
 * @see {@link UserSchema.lastLocationIsp}
 * @see {@link UserSchema.lastLocationOrg}
 * @see {@link UserSchema.lastLocationAs}
 * @see {@link UserSchema.lastLocationAsname}
 * @see {@link UserSchema.lastLocationReverse}
 * @see {@link UserSchema.lastLocationMobile}
 * @see {@link UserSchema.lastLocationProxy}
 * @see {@link UserSchema.lastLocationHosting}
 * @see {@link UserSchema.lastLocationQuery}
 * @see {@link UserSchema.lastLocationStatus}
 * @see {@link UserSchema.lastLocationMessage}
 * @see {@link UserSchema.lastLocationCountryCode}
 * @see {@link UserSchema.lastLocationRegion}
 * @see {@link UserSchema.lastLocationRegionName}
 */
const UserSchema = {
  /**
   * @constant {object} UserSchema.id - User id field object with properties for the field in the table schema for the User model in the database
   * @description User id field
   * @type {object} UserSchema.id - User id field object with properties for the field in the table schema for the User model in the database
   * @memberof UserSchema
   * @inner
   * @private
   * @readonly
   * @since 1.0.0
   * @version 1.0.0
   * @see {@link User}
   * @see {@link UserSchema.id.primaryKey}
   * @see {@link UserSchema.id.autoIncrement}
   * @see {@link UserSchema.id.type}
   * @see {@link UserSchema.id.allowNull}
   * @see {@link UserSchema.id.unique}
   * @see {@link UserSchema.id.defaultValue}
   * @see {@link UserSchema.id.comment}
   * @see {@link UserSchema.id.validate}
   * @see {@link UserSchema.id.set}
   * @see {@link UserSchema.id.get}
   * @see {@link UserSchema.id.field}
   * @see {@link UserSchema.id.references}
   * @see {@link UserSchema.id.onDelete}
   * @see {@link UserSchema.id.onUpdate}
   * @see {@link UserSchema.id.hooks}
   * @see {@link UserSchema.id.indexes}
   * @see {@link UserSchema.id.indexes.unique}
   * @see {@link UserSchema.id.indexes.name}
   * @see {@link UserSchema.id.indexes.method}
   * @see {@link UserSchema.id.indexes.fields}
   * @see {@link UserSchema.id.indexes.where}
   * @see {@link UserSchema.id.indexes.parser}
   * @see {@link UserSchema.id.indexes.collate}
   * @see {@link UserSchema.id.indexes.length}
   * @see {@link UserSchema.id.indexes.type}
   * @see {@link UserSchema.id.indexes.using}
   * @see {@link UserSchema.id.indexes.operator}
   * @see {@link UserSchema.id.indexes.concurrently}
   */
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  /**
   * @constant {object} UserSchema.email - User email field object with properties for the field in the table schema for the User model in the database
   * @description User email field
   * @type {object} UserSchema.email - User email field object with properties for the field in the table schema for the User model in the database
   * @memberof UserSchema
   * @inner
   * @private
   * @readonly
   * @since 1.0.0
   * @version 1.0.0
   * @see {@link User}
   * @see {@link UserSchema.email.unique}
   * @see {@link UserSchema.email.allowNull}
   * @see {@link UserSchema.email.type}
   * @see {@link UserSchema.email.validate}
   * @see {@link UserSchema.email.set}
   * @see {@link UserSchema.email.get}
 
   */
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  /**
   * @constant {object} UserSchema.password - User password field object with properties for the field in the table schema for the User model in the database
   * @description User password field
   * @type {object} UserSchema.password - User password field object with properties for the field in the table schema for the User model in the database
   * @memberof UserSchema
   * @inner
   * @private
   * @readonly
   * @since 1.0.0
   * @version 1.0.0
   * @see {@link User}
   * @see {@link UserSchema.password.allowNull}
   * @see {@link UserSchema.password.type}
   * @see {@link UserSchema.password.validate}
   * @see {@link UserSchema.password.set}
   * @see {@link UserSchema.password.get}
   */
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  /**
   * @constant {object} UserSchema.role - User role field object with properties for the field in the table schema for the User model in the database
   * @description User role field (admin, customer) field for the User model in the database
   * @type {object} UserSchema.role - User role field object with properties for the field in the table schema for the User model in the database
   * @memberof UserSchema
   * @inner
   * @private
   * @readonly
   * @since 1.0.0
   * @version 1.0.0
   * @see {@link User}
   * @see {@link UserSchema.role.allowNull}
   * @see {@link UserSchema.role.type}
   * @see {@link UserSchema.role.defaultValue}
   * @see {@link UserSchema.role.validate}
   * @see {@link UserSchema.role.set}
   * @see {@link UserSchema.role.get}
   * @see {@link UserSchema.role.field}
   * @see {@link UserSchema.role.references}
   * @see {@link UserSchema.role.onDelete}
   * @see {@link UserSchema.role.onUpdate}
   * @see {@link UserSchema.role.hooks}
   */
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  /**
   * @constant {object} UserSchema.createdAt - User createdAt field object with properties for the field in the table schema for the User model in the database
   * @description User createdAt field
   * @type {object} UserSchema.createdAt - User createdAt field object with properties for the field in the table schema for the User model in the database
   * @memberof UserSchema
   * @inner
   * @private
   * @readonly
   * @since 1.0.0
   * @version 1.0.0
   * @see {@link User}
   * @see {@link UserSchema.createdAt.allowNull}
   * @see {@link UserSchema.createdAt.type}
   * @see {@link UserSchema.createdAt.defaultValue}
   * @see {@link UserSchema.createdAt.field}
   * @see {@link UserSchema.createdAt.validate}
   * @see {@link UserSchema.createdAt.set}
   * @see {@link UserSchema.createdAt.get}
   *
   */
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
};

/**
 * @class User - User model object with fields and properties for each field in the table schema for the User model in the database
 * @description User model object with fields and properties for each field in the table schema for the User model in the database 
 * @type {object} User - User model object with fields and properties for each field in the table schema for the User model in the database
 * @extends {Model} - Sequelize Model class object with fields and properties for each field in the table schema for the User model in the database 
 * @memberof User
 * @inner
 * @private
 * @readonly
 * @since 1.0.0
 * @version 1.0.0
 * @see {@link UserSchema}
 */
class User extends Model {
  /**
   * @function User.associate - Associate the User model with other models
   * @description Associate the User model with other models
   * @type {function} User.associate - Associate the User model with other models
   * @memberof User
   * @param {object} models - Sequelize object
   * @inner
   * @private
   * @readonly
   * @since 1.0.0
   * @version 1.0.0
   * @see {@link User}
   * @see {@link UserSchema}
   */
  static associate(models) {
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId'
    });
    this.hasOne(models.refreshtoken, {
      as: 'refreshtoken',
      foreignKey: 'userId'
    });
    this.belongsToMany(models.Role, {
      through: 'user_roles',
      as: 'roles',
      foreignKey: 'userId',
      otherKey: 'roleId'
    });
  }

  /**
   * @function User.config - Configure the User model with properties for the table schema for the User model in the database
   * @description Configure the User model with properties for the table schema for the User model in the database
   * @type {function} User.config - Configure the User model with properties for the table schema for the User model in the database
   * @memberof User
   * @param {object} sequelize - Sequelize object
   * @returns {object} - User model object with fields and properties for each field in the table schema for the User model in the database
   * @inner
   * @private
   * @readonly
   * @since 1.0.0
   * @version 1.0.0
   * @see {@link User}
   * @see {@link UserSchema}
   */
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}


module.exports = { USER_TABLE, User, UserSchema }