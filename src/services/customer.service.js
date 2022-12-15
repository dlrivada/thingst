const boom = require('@hapi/boom');
const { bcrypt } = require('bcrypt');
const { models } = require('../libs/sequelize');

class CustomerService {

  constructor() {}

  async find(query) {
    const options = {
      include: ['user'],
      where: {}
    }
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const { name, lastName, phone} = query;
    if (name) {
      options.where.name = {
        [models.Sequelize.Op.like]: `%${name}%`
      }
    }
    if (lastName) {
      options.where.lastName = {
        [models.Sequelize.Op.like]: `%${lastName}%`
      }
    }
    if (phone) {
      options.where.phone = {
        [models.Sequelize.Op.like]: `%${phone}%`
      }
    }
    if (name && lastName) {
      options.where.name = {
        [models.Sequelize.Op.like]: `%${name}%`
      }
      options.where.lastName = {
        [models.Sequelize.Op.like]: `%${lastName}%`
      }
    }
    if (name && phone) {
      options.where.name = {
        [models.Sequelize.Op.like]: `%${name}%`
      }
      options.where.phone = {
        [models.Sequelize.Op.like]: `%${phone}%`
      }
    }
    if (lastName && phone) {
      options.where.lastName = {
        [models.Sequelize.Op.like]: `%${lastName}%`
      }
      options.where.phone = {
        [models.Sequelize.Op.like]: `%${phone}%`
      }
    }
    if (name && lastName && phone) {
      options.where.name = {
        [models.Sequelize.Op.like]: `%${name}%`
      }
      options.where.lastName = {
        [models.Sequelize.Op.like]: `%${lastName}%`
      }
      options.where.phone = {
        [models.Sequelize.Op.like]: `%${phone}%`
      }
    }
    const { order, order_desc, order_by_name, order_by_lastName, order_by_phone } = query;
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
    if (order_by_lastName) {
      options.order = [
        ['lastName', order_by_lastName]
      ]
    }
    if (order_by_phone) {
      options.order = [
        ['phone', order_by_phone]
      ]
    }
    if (order_by_name && order_by_lastName) {
      options.order = [
        ['name', order_by_name],
        ['lastName', order_by_lastName]
      ]
    }
    if (order_by_name && order_by_phone) {
      options.order = [
        ['name', order_by_name],
        ['phone', order_by_phone]
      ]
    }
    if (order_by_lastName && order_by_phone) {
      options.order = [
        ['lastName', order_by_lastName],
        ['phone', order_by_phone]
      ]
    }
    if (order_by_name && order_by_lastName && order_by_phone) {
      options.order = [
        ['name', order_by_name],
        ['lastName', order_by_lastName],
        ['phone', order_by_phone]
      ]
    }
    if (order && order_by_name) {
      options.order = [
        ['id', order],
        ['name', order_by_name]
      ]
    }
    if (order && order_by_lastName) {
      options.order = [
        ['id', order],
        ['lastName', order_by_lastName]
      ]
    }
    if (order && order_by_phone) {
      options.order = [
        ['id', order],
        ['phone', order_by_phone]
      ]
    }
    if (order && order_by_name && order_by_lastName) {
      options.order = [
        ['id', order],
        ['name', order_by_name],
        ['lastName', order_by_lastName]
      ]
    }
    if (order && order_by_name && order_by_phone) {
      options.order = [
        ['id', order],
        ['name', order_by_name],
        ['phone', order_by_phone]
      ]
    }
    if (order && order_by_lastName && order_by_phone) {
      options.order = [
        ['id', order],
        ['lastName', order_by_lastName],
        ['phone', order_by_phone]
      ]
    }
    if (order && order_by_name && order_by_lastName && order_by_phone) {
      options.order = [
        ['id', order],
        ['name', order_by_name],
        ['lastName', order_by_lastName],
        ['phone', order_by_phone]
      ]
    }
    if (order_desc && order_by_name) {
      options.order = [
        ['id', order_desc],
        ['name', order_by_name]
      ]
    }
    if (order_desc && order_by_lastName) {
      options.order = [
        ['id', order_desc],
        ['lastName', order_by_lastName]
      ]
    }
    if (order_desc && order_by_phone) {
      options.order = [
        ['id', order_desc],
        ['phone', order_by_phone]
      ]
    }
    if (order_desc && order_by_name && order_by_lastName) {
      options.order = [
        ['id', order_desc],
        ['name', order_by_name],
        ['lastName', order_by_lastName]
      ]
    }
    if (order_desc && order_by_name && order_by_phone) {
      options.order = [
        ['id', order_desc],
        ['name', order_by_name],
        ['phone', order_by_phone]
      ]
    }
    if (order_desc && order_by_lastName && order_by_phone) {
      options.order = [
        ['id', order_desc],
        ['lastName', order_by_lastName],
        ['phone', order_by_phone]
      ]
    }
    if (order_desc && order_by_name && order_by_lastName && order_by_phone) {
      options.order = [
        ['id', order_desc],
        ['name', order_by_name],
        ['lastName', order_by_lastName],
        ['phone', order_by_phone]
      ]
    }
    
    const rta = await models.Customer.findAll(options);
    return rta;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id, {
      include: ['user']
    });
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    };  
    const newCustomer = await models.Customer.create(newData, {
      include: ['user']
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes, {
      include: ['user']
    });
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy({
      include: ['user']
    });
    return { rta: true };
  }

}

module.exports = CustomerService;