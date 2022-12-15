const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {
  constructor(){
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  /**
   * Find all orders of an user in database and return them as array of objects  
   * @function findByUser  
   * @description Find all orders of an user in database and return them as array of objects
   * @param {string} id
   * @param {object} data
   * @returns {Promise<Order>}
   * @memberof OrderService
   * @throws {Error} If order is not found
   * @throws {Error} If order is not updated
   * @throws {Error} If order is not deleted
   * @throws {Error} If order is not found
   * @version 1.0.0
   * @since 1.0.0
   * @example
   * const orderService = require('./services/order.service');
   * const orders = await orderService.findByUser(userId);
   * @see {@link https://www.npmjs.com/package/@hapi/boom| @hapi/boom}
   * @see {@link https://www.npmjs.com/package/joi| joi}
   * @see {@link https://www.npmjs.com/package/joi#validation-api| joi validation api}
   */
  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });
    return orders;
  }

  async find(query) {
    const options = {
      include: [{
        association: 'customer',
        include: ['user']
      }, {
        association: 'orderLines',
        include: [{
          association: 'product',
          include: ['category']
        }]
      }],
      where: {}
    }
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const { status, customer_id } = query;
    if (status) {
      options.where.status = status;
    }
    if (customer_id) {
      options.where.customer_id = customer_id;
    }
    if (status && customer_id) {
      options.where.status = status;
      options.where.customer_id = customer_id;
    }
    const { order, order_desc, order_by_status, order_by_customer_id } = query;
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
    if (order_by_status) {
      options.order = [
        ['status', order_by_status]
      ]
    }
    if (order_by_customer_id) {
      options.order = [
        ['customer_id', order_by_customer_id]
      ]
    }
    if (order && order_by_status) {
      options.order = [
        ['id', order],
        ['status', order_by_status]
      ]
    }
    if (order && order_by_customer_id) {
      options.order = [
        ['id', order],
        ['customer_id', order_by_customer_id]
      ]
    }
    if (order_desc && order_by_status) {
      options.order = [
        ['id', order_desc],
        ['status', order_by_status]
      ]
    }
    if (order_desc && order_by_customer_id) {
      options.order = [
        ['id', order_desc],
        ['customer_id', order_by_customer_id]
      ]
    }
    if (order_by_status && order_by_customer_id) {
      options.order = [
        ['status', order_by_status],
        ['customer_id', order_by_customer_id]
      ]
    }
    if (order && order_by_status && order_by_customer_id) {
      options.order = [
        ['id', order],
        ['status', order_by_status],
        ['customer_id', order_by_customer_id]
      ]
    }
    if (order_desc && order_by_status && order_by_customer_id) {
      options.order = [
        ['id', order_desc],
        ['status', order_by_status],
        ['customer_id', order_by_customer_id]
      ]
    }
    const rta = await models.Order.findAll(options);
    return rta;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [{
        association: 'customer',
        include: ['user']
      }, {
        association: 'orderLines',
        include: [{
          association: 'product',
          include: ['category']
        }]
      }]
      });
    if (!order) {
      throw boom.notFound('order not found');
    }
    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const rta = await order.update(changes);
    return rta;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }
}

module.exports = OrderService;