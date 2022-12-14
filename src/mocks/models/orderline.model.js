const { Model, DataTypes, Sequelize } = require('sequelize');

const ORDER_LINE_TABLE = 'order_lines';

const OrderLineSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    orderId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'order_id',
        references: {
            model: 'orders',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'product_id',
        references: {
            model: 'products',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }
}

class OrderLine extends Model {
    static associate(models) {
        this.belongsTo(models.Order, {
            as: 'order',
            foreignKey: 'orderId'
        });
        this.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'productId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_LINE_TABLE,
            modelName: 'OrderLine',
            timestamps: false
        }
    }
}

module.exports = {
    OrderLine,
    OrderLineSchema,
    ORDER_LINE_TABLE
}
