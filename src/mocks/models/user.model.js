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


module.exports = { USER_TABLE, User }