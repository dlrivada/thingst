/**
 * @fileoverview User service class for user service operations 
 * @author {author} dlrivada <{@mail dlrivada@hotmail.com}> ({@link http://dlrivada.com})
 * @module services/user.service 
 * @requires @hapi/boom 
 * @requires ./../libs/sequelize
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * const userService = new UserService();
 * const user = await userService.create(data);
 * const users = await userService.find(query);
 * const user = await userService.findOne(id);
 * const user = await userService.update(id, changes);
 * const user = await userService.delete(id);
 * const user = await userService.login(data);
 * const user = await userService.logout(id);
 * const user = await userService.refreshToken(id);
 * const user = await userService.forgotPassword(data);
 * const user = await userService.resetPassword(data);
 * const user = await userService.changePassword(data);
 * const user = await userService.changeEmail(data);
 * const user = await userService.changeEmailConfirm(data); 
 * @see {@link https://www.npmjs.com/package/@hapi/boom| @hapi/boom}
 * @see {@link https://www.npmjs.com/package/sequelize| sequelize}
 * @see {@link https://www.npmjs.com/package/sequelize#query-interface| sequelize query interface}
 * @see {@link https://www.npmjs.com/package/sequelize#model-instances| sequelize model instances}
 * @see {@link https://www.npmjs.com/package/sequelize#model-querying-basics| sequelize model querying basics}
 */

const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

/**
 * UserService class for user service operations
 * @class UserService 
 * @description Service for user
 * @classdesc Service for user
 * @constructor UserService()
 * @exports UserService
 * @requires @hapi/boom
 * @requires ./../libs/sequelize
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * const userService = new UserService();
 */
class UserService {
  /**
   * @description Create a new user service
   * @constructor UserService()
   * @version 1.0.0
   * @since 1.0.0
   * @example
   * const userService = new UserService();
   */
  constructor() {}

/**
 * @description Create a new user
 * @method UserService.create()
 * @methoddesc Create a new user
 * @param {Object} data - User data
 * @returns {Object} User created
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * const userService = new UserService();
 * const user = await userService.create(data);
 */
  async create(data) {
    const newUser = await models.User.create(data,{
      include: ['customer']
    });
    return newUser;
  }

/**
 * @description Find users
 * @param {Object} query - Query params
 * @returns {Object} Users found
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * const userService = new UserService();
 * const users = await userService.find(query);
 * @todo
 * 6. Add exclude
 * 7. Add relations
 * 8. Add relations filter
 * 9. Add relations search
 * 10. Add relations order
 * 11. Add relations pagination
 * 12. Add relations include
 * 13. Add relations exclude
 * @dlrivada 2022-12-14 17:34 - Add pagination 
 * and order by id and name and email 
 * and search by name and email 
 * and filter by name and email 
 * and include customer 
 * and relation customer
 */
  async find(query) {
    const options = {
      include: ['customer'],
      where: {},
    }
    const { limit, offset } = query;
    if (limit && offset) {  
      options.limit = limit;
      options.offset = offset;
    }
    const { name, email } = query;
    if (name) {
      options.where.name = {
        [models.Sequelize.Op.like]: `%${name}%`
      }
    }
    if (email) {
      options.where.email = {
        [models.Sequelize.Op.like]: `%${email}%`
      }
    }
    if (name && email) {
      options.where.name = {
        [models.Sequelize.Op.like]: `%${name}%`
      }
      options.where.email = {
        [models.Sequelize.Op.like]: `%${email}%`
      }
    }
    const { order, order_desc, order_by_name, order_by_email } = query;
    if (order) {
      options.order = [
        ['id', order]
      ]
    }
    if (order_desc) {
      options.order = [
        ['id', order_desc]
      ]
    }
    if (order_by_name) {
      options.order = [
        ['name', order_by_name]
      ]
    }
    if (order_by_email) {
      options.order = [
        ['email', order_by_email]
      ]
    }
    if (order_by_name && order_by_email) {
      options.order = [
        ['name', order_by_name],
        ['email', order_by_email]
      ]
    }
    if (order_by_name && order_by_email && order) {
      options.order = [
        ['name', order_by_name],
        ['email', order_by_email],
        ['id', order]
      ]
    }
    if (order_by_name && order_by_email && order_desc) {
      options.order = [
        ['name', order_by_name],
        ['email', order_by_email],
        ['id', order_desc]
      ]
    }
    const rta = await models.User.findAll(options);
    return rta;
  }

/**
 * @description Find one user
 * @param {Number} id - User id
 * @returns {Object} User found
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * const userService = new UserService();
 * const user = await userService.findOne(id);
 * @todo
 * 6. Add exclude
 * 7. Add relations
 * 8. Add relations filter
 * 9. Add relations search
 * 10. Add relations order
 * 11. Add relations pagination
 * 12. Add relations include
 * 13. Add relations exclude
 * @dlrivada 2022-12-14 17:34 - Add pagination
 * and order by id and name and email
 * and search by name and email
 * and filter by name and email
 * and include customer
 * and relation customer
 */
  async findOne(id) {
    const user = await models.User.findByPk(id,{
      include: ['customer']
    });
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  /**
   * @description Update user
   * @param {Number} id - User id
   * @param {Object} changes - User changes
   * @returns {Object} User updated
   * @version 1.0.0
   * @since 1.0.0
   * @example
   * const userService = new UserService();
   * const user = await userService.update(id, changes);
   * @todo
   * 6. Add exclude
   * 7. Add relations
   * 8. Add relations filter
   * 9. Add relations search
   * 10. Add relations order
   * 11. Add relations pagination
   * 12. Add relations include
   * 13. Add relations exclude
   * @dlrivada 2022-12-14 17:34 - Add pagination
   * and order by id and name and email
   * and search by name and email
   * and filter by name and email
   * and include customer
   * and relation customer
   */
  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes,{
      include: ['customer']
    });
    return rta;
  }

  /**
   * @description Delete user
   * @param {Number} id - User id
   * @returns {Object} User deleted
   * @version 1.0.0
   * @since 1.0.0
   * @example
   * const userService = new UserService();
   * const user = await userService.delete(id);
   * @todo
   * 6. Add exclude
   * 7. Add relations
   * 8. Add relations filter
   * 9. Add relations search
   * 10. Add relations order
   * 11. Add relations pagination
   * 12. Add relations include
   * 13. Add relations exclude
   * @dlrivada 2022-12-14 17:34 - Add pagination
   * and order by id and name and email
   * and search by name and email
   * and filter by name and email
   * and include customer
   * and relation customer
   */
  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy({
      include: ['customer']
    });
    return { id };
  }
}

module.exports = UserService;