const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderLineService {
    
      constructor() {}
    
      async create(query) {
      const options = {
        include: ['order', 'product']
      }
      const { limit, offset } = query;
      if (limit && offset) {
        options.limit = limit;
        options.offset = offset;
      }
     const newOrderLine = await models.OrderLine.create(options);
     return newOrderLine;
      }

      async find(query) {
      const options = {
        include: [{
          association: 'order',
          include: [ {
            association: 'customer',
            include: ['user']
          }]
        }, {
          association: 'product',
          include: ['category']
        }],
        where: {}
      }
      const { limit, offset } = query;
      if (limit && offset) {
        options.limit = limit;
        options.offset = offset;
      }
      const { order_id, product_id } = query;
      if (order_id) {
        options.where.order_id = order_id;
      }
      if (product_id) {
        options.where.product_id = product_id;
      }
      if (order_id && product_id) {
        options.where.order_id = order_id;
        options.where.product_id = product_id;
      }
      const { order, order_desc, order_by_order_id, order_by_product_id } = query;
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
      if (order_by_order_id) {
        options.order = [
          ['order_id', order_by_order_id]
        ]
      }
      if (order_by_product_id) {
        options.order = [
          ['product_id', order_by_product_id]
        ]
      }
      if (order && order_by_order_id) {
        options.order = [
          ['id', order],
          ['order_id', order_by_order_id]
        ]
      }
      if (order && order_by_product_id) {
        options.order = [
          ['id', order],
          ['product_id', order_by_product_id]
        ]
      }
      if (order_desc && order_by_order_id) {
        options.order = [
          ['id', order_desc],
          ['order_id', order_by_order_id]
        ]
      }
      if (order_desc && order_by_product_id) {
        options.order = [
          ['id', order_desc],
          ['product_id', order_by_product_id]
        ]
      }
      if (order_by_order_id && order_by_product_id) {
        options.order = [
          ['order_id', order_by_order_id],
          ['product_id', order_by_product_id]
        ]
      }
      if (order && order_by_order_id && order_by_product_id) {
        options.order = [
          ['id', order],
          ['order_id', order_by_order_id],
          ['product_id', order_by_product_id]
        ]
      }
      if (order_desc && order_by_order_id && order_by_product_id) {
        options.order = [
          ['id', order_desc],
          ['order_id', order_by_order_id],
          ['product_id', order_by_product_id]
        ]
      }
      const orderLines = await models.OrderLine.findAll(options);
      return orderLines;
      }

      async findOne(id) {
     const orderLine = await models.OrderLine.findByPk(id, {
        include: [{
            association: 'order',
            include: [{
              association: 'customer',
              include: ['user']
            }]
        }, {
            association: 'product',
            include: 'category'
        }]
     });
     if (!orderLine) {
        throw boom.notFound('orderLine not found');
     }
     return orderLine;
      }
    
      async update(id, changes) {
     const orderLine = await this.findOne(id);
     const rta = await orderLine.update(changes);
     return rta;
      }
    
      async delete(id) {
     const orderLine = await this.findOne(id);
     await orderLine.destroy();
     return { id };
      }
    
    }

module.exports = OrderLineService;