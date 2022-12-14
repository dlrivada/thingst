const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CategoryService {
  constructor(){}

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find(query) {
    const options = {
      include: ['products'],
      where: {}
    }
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const { name } = query;
    if (name) {
      options.where.name = {
        [models.Sequelize.Op.like]: `%${name}%`
      }
    }
    const { order, order_desc } = query;
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
    const rta = await models.Category.findAll(options);
    return rta;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
      });
    if (!category) {
      throw boom.notFound('category not found');
    }
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const rta = await category.update(changes);
    return rta;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }

}

module.exports = CategoryService;