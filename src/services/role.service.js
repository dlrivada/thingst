const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

/**
 * RoleService class for role service operations    
 * @class RoleService
 * @description Service for role
 * @classdesc Service for role
 * @constructor RoleService()
 * @exports RoleService
 * @requires @hapi/boom
 * @requires ./../libs/sequelize
 * @version 1.0.0
 * @since 1.0.0
 * @example
 * const roleService = new RoleService();
 */
class RoleService {
  /**
   * @description Create a new role service
   * @constructor RoleService()
   * @version 1.0.0
   * @since 1.0.0
   * @example
   * const roleService = new RoleService();
   */
  constructor() {}

    /**
     * @description Create a new role
     * @method RoleService.create()
     * @methoddesc Create a new role
     * @param {Object} data - Role data
     * @returns {Object} Role created
     * @version 1.0.0
     * @since 1.0.0
     * @example
     * const roleService = new RoleService();
     * const role = await roleService.create(data);
     * @see {@link https://www.npmjs.com/package/@hapi/boom| @hapi/boom}
     * @see {@link https://www.npmjs.com/package/sequelize| sequelize}
     * @see {@link https://www.npmjs.com/package/sequelize#query-interface| sequelize query interface}
     * @see {@link https://www.npmjs.com/package/sequelize#model-instances| sequelize model instances}
     * @see {@link https://www.npmjs.com/package/sequelize#model-querying-basics| sequelize model querying basics}
     */
    async create(data) {
        const newRole = await models.Role.create(data);
        return newRole;
    }

    async find(query) {
        const options = {
            include: [{
                association: 'users',
                include: ['user']
            }]
        };
        const roles = await models.Role.findAll(options);
        if (!roles) throw boom.notFound('Roles not found');
        return roles;
    }

    async findOne(query) {
        const role = await models.Role.findByPk(query.id, {
            include: [{
                association: 'users',
                include: ['user']
            }]
        });
        if (!role) throw boom.notFound('Role not found');
        return role;
    }

    async getRolesByUserId(userId) {
        const roles = await models.Role.findAll({
            include: [{
                association: 'users',
                where: {
                    userId
                }
            }]
        });
        if (!roles) throw boom.notFound('Roles not found');
        return roles;
    }

    /**
     * @description Get all roles
     * @method RoleService.getAll()
     * @methoddesc Get all roles
     * @returns {Object} Roles found
     * @version 1.0.0
     * @since 1.0.0
     * @example
     * const roleService = new RoleService();
     * const roles = await roleService.getAll();
     * @see {@link https://www.npmjs.com/package/@hapi/boom| @hapi/boom}
     * @see {@link https://www.npmjs.com/package/sequelize| sequelize}
     * @see {@link https://www.npmjs.com/package/sequelize#query-interface| sequelize query interface}
     * @see {@link https://www.npmjs.com/package/sequelize#model-instances| sequelize model instances}
     * @see {@link https://www.npmjs.com/package/sequelize#model-querying-basics| sequelize model querying basics}
     */
    async getAll() {
        const roles = await models.Role.findAll();
        if (!roles) throw boom.notFound('Roles not found');
        return roles;
    }

    /**
     * @description Get a role by id
     * @method RoleService.getById()
     * @methoddesc Get a role by id
     * @param {string} id - Role id
     * @returns {Object} Role found
     * @version 1.0.0
     * @since 1.0.0
     * @example
     * const roleService = new RoleService();
     * const role = await roleService.getById(id);
     * @see {@link https://www.npmjs.com/package/@hapi/boom| @hapi/boom}
     * @see {@link https://www.npmjs.com/package/sequelize| sequelize}
     * @see {@link https://www.npmjs.com/package/sequelize#query-interface| sequelize query interface}
     * @see {@link https://www.npmjs.com/package/sequelize#model-instances| sequelize model instances}
     * @see {@link https://www.npmjs.com/package/sequelize#model-querying-basics| sequelize model querying basics}
     */
    async getById(id) {
        const role = await models.Role.findByPk(id);
        if (!role) throw boom.notFound('Role not found');
        return role;
    }

    /**
     * @description Update a role by id
     * @method RoleService.updateById()
     * @methoddesc Update a role by id
     * @param {string} id - Role id
     * @param {Object} data - Role data
     * @returns {Object} Role updated
     * @version 1.0.0
     * @since 1.0.0
     * @example
     * const roleService = new RoleService();
     * const role = await roleService.updateById(id, data);
     * @see {@link https://www.npmjs.com/package/@hapi/boom| @hapi/boom}
     * @see {@link https://www.npmjs.com/package/sequelize| sequelize}
     * @see {@link https://www.npmjs.com/package/sequelize#query-interface| sequelize query interface}
     * @see {@link https://www.npmjs.com/package/sequelize#model-instances| sequelize model instances}
     * @see {@link https://www.npmjs.com/package/sequelize#model-querying-basics| sequelize model querying basics}
     * @see {@link https://www.npmjs.com/package/sequelize#updating-deleting-rows| sequelize updating deleting rows}
     * @see {@link https://www.npmjs.com/package/sequelize#updating-records| sequelize updating records}
     * @see {@link https://www.npmjs.com/package/sequelize#updating-attributes| sequelize updating attributes}
     * @see {@link https://www.npmjs.com/package/sequelize#updating-associations| sequelize updating associations}
     * @see {@link https://www.npmjs.com/package/sequelize#updating-and-fetching-rows| sequelize updating and fetching rows}
     * @see {@link https://www.npmjs.com/package/sequelize#updating-and-fetching-associations| sequelize updating and fetching associations}
     */
    async update(id, data) {
        const role = await models.Role.findByPk(id);
        if (!role) throw boom.notFound('Role not found');
        const updatedRole = await role.update(data);
        return updatedRole;
    }

    /**
     * @description Delete a role by id
     * @method RoleService.deleteById()
     * @methoddesc Delete a role by id
     * @param {string} id - Role id
     * @returns {Object} Role deleted
     * @version 1.0.0
     * @since 1.0.0
     * @example
     * const roleService = new RoleService();
     * const role = await roleService.deleteById(id);
     * @see {@link https://www.npmjs.com/package/@hapi/boom| @hapi/boom}
     * @see {@link https://www.npmjs.com/package/sequelize| sequelize}
     * @see {@link https://www.npmjs.com/package/sequelize#query-interface| sequelize query interface}
     * @see {@link https://www.npmjs.com/package/sequelize#model-instances| sequelize model instances}
     * @see {@link https://www.npmjs.com/package/sequelize#model-querying-basics| sequelize model querying basics}
     * @see {@link https://www.npmjs.com/package/sequelize#updating-deleting-rows| sequelize updating deleting rows}
     * @see {@link https://www.npmjs.com/package/sequelize#deleting-records| sequelize deleting records}
     * @see {@link https://www.npmjs.com/package/sequelize#deleting-associations| sequelize deleting associations}
     * @see {@link https://www.npmjs.com/package/sequelize#deleting-and-fetching-rows| sequelize deleting and fetching rows}
     * @see {@link https://www.npmjs.com/package/sequelize#deleting-and-fetching-associations| sequelize deleting and fetching associations}
     * @see {@link https://www.npmjs.com/package/sequelize#deleting-rows| sequelize deleting rows}
     */
    async delete(id) {
        const role = await models.Role.findByPk(id);
        if (!role) throw boom.notFound('Role not found');
        const deletedRole = await role.destroy();
        return { id };
    }
}

module.exports = RoleService;