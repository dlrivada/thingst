const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class ProductsService {

  constructor(){}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const { price_min, price_max, name, category_id, description } = query;
    if (price_min) {
      options.where.price = {
        [models.Sequelize.Op.gte]: price_min
      }
    }
    if (price_max) {
      options.where.price = {
        [models.Sequelize.Op.lte]: price_max
      }
    }
    if (price_min && price_max) {
      options.where.price = {
        [models.Sequelize.Op.gte]: price_min,
        [models.Sequelize.Op.lte]: price_max
      }
    }
    if (name) {
      options.where.name = {
        [models.Sequelize.Op.like]: `%${name}%`
      }
    }
    if (category_id) {
      options.where.category_id = category_id;
    }
    if (description) {
      options.where.description = {
        [models.Sequelize.Op.like]: `%${description}%`
      }
    }
    if (name && category_id) {
      options.where.name = {
        [models.Sequelize.Op.like]: `%${name}%`
      }
      options.where.category_id = category_id;
    }
    if (name && description) {
      options.where.name = {
        [models.Sequelize.Op.like]: `%${name}%`
      }
      options.where.description = {
        [models.Sequelize.Op.like]: `%${description}%`
      }
    }
    if (category_id && description) {
      options.where.category_id = category_id;
      options.where.description = {
        [models.Sequelize.Op.like]: `%${description}%`
      }
    }
    if (name && category_id && description) {
      options.where.name = {
        [models.Sequelize.Op.like]: `%${name}%`
      }
      options.where.category_id = category_id;
      options.where.description = {
        [models.Sequelize.Op.like]: `%${description}%`
      }
    }
    if (price_min && price_max && category_id) {
      options.where.price = {
        [models.Sequelize.Op.gte]: price_min,
        [models.Sequelize.Op.lte]: price_max
      }
      options.where.category_id = category_id;
    }
    if (price_min && price_max && name) {
      options.where.price = {
        [models.Sequelize.Op.gte]: price_min,
        [models.Sequelize.Op.lte]: price_max
      }
      options.where.name = {
        [models.Sequelize.Op.like]: `%${name}%`
      }
    }
    if (price_min && price_max && description) {
      options.where.price = {
        [models.Sequelize.Op.gte]: price_min,
        [models.Sequelize.Op.lte]: price_max
      }
      options.where.description = {
        [models.Sequelize.Op.like]: `%${description}%`
      }
    }
    if (price_min && price_max && category_id && name) {
      options.where.price = {
        [models.Sequelize.Op.gte]: price_min,
        [models.Sequelize.Op.lte]: price_max
      }
      options.where.category_id = category_id;
      options.where.name = {
        [models.Sequelize.Op.like]: `%${name}%`
      }
    }
    if (price_min && price_max && category_id && description) {
      options.where.price = {
        [models.Sequelize.Op.gte]: price_min,
        [models.Sequelize.Op.lte]: price_max
      }
      options.where.category_id = category_id;
      options.where.description = {
        [models.Sequelize.Op.like]: `%${description}%`
      }
    }
    if (price_min && price_max && name && description) {
      options.where.price = {
        [models.Sequelize.Op.gte]: price_min,
        [models.Sequelize.Op.lte]: price_max
      }
      options.where.name = {
        [models.Sequelize.Op.like]: `%${name}%`
      }
      options.where.description = {
        [models.Sequelize.Op.like]: `%${description}%`
      }
    }
    if (price_min && price_max && category_id && name && description) {
      options.where.price = {
        [models.Sequelize.Op.gte]: price_min,
        [models.Sequelize.Op.lte]: price_max
      }
      options.where.category_id = category_id;
      options.where.name = {
        [models.Sequelize.Op.like]: `%${name}%`
      }
      options.where.description = {
        [models.Sequelize.Op.like]: `%${description}%`
      }
    }    
    const { order, order_desc, order_by_name, order_by_category, order_by_price } = query;
    if (order) {
      options.order = [
        [order, 'ASC']
      ]
    }
    if (order_desc) {
      options.order = [
        [order_desc, 'DESC']
      ]
    }
    if (order_by_price) {
      options.order = [
        ['price', order_by_price]
      ]
    }
    if (order_by_name) {
      options.order = [
        ['name', order_by_name]
      ]
    }
    if (order_by_category) {
      options.order = [
        [models.Category, 'name', order_by_category]
      ]
    }
    if (order_by_category && order_by_name) {
      options.order = [
        [models.Category, 'name', order_by_category],
        ['name', order_by_name]
      ]
    }
    if (order_by_category && order_by_price) {
      options.order = [
        [models.Category, 'name', order_by_category],
        ['price', order_by_price]
      ]
    }
    if (order_by_name && order_by_price) {
      options.order = [
        ['name', order_by_name],
        ['price', order_by_price]
      ]
    }
    if (order_by_category && order_by_name && order_by_price) {
      options.order = [
        [models.Category, 'name', order_by_category],
        ['name', order_by_name],
        ['price', order_by_price]
      ]
    }
    if (order_by_name && order_by_price && order) {
      options.order = [
        ['name', order_by_name],
        ['price', order_by_price],
        [order, 'ASC']
      ]
    }
    if (order_by_category && order_by_name && order_by_price && order) {
      options.order = [
        [models.Category, 'name', order_by_category],
        ['name', order_by_name],
        ['price', order_by_price],
        [order, 'ASC']
      ]
    }
    if (order_by_category && order_by_name && order_by_price && order_desc) {
      options.order = [
        [models.Category, 'name', order_by_category],
        ['name', order_by_name],
        ['price', order_by_price],
        [order_desc, 'DESC']
      ]
    }
    if (order_by_name && order_by_price && order_desc) {
      options.order = [
        ['name', order_by_name],
        ['price', order_by_price],
        [order_desc, 'DESC']
      ]
    }
    const rta = await models.Product.findAll(options);
    return rta;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id,{
      include: ['category']
    });
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }

}

module.exports = ProductsService;