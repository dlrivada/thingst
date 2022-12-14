const { type } = require('os');
const { Model, DataTypes, Sequelize } = require('sequelize');

const ORDER_TABLE = 'orders';

const OrderSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    customerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'customer_id',
        references: {
            model: 'customers',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    },
    total: {
        type: DataTypes.VIRTUAL,
        get() {
            if (!this.orderLines) {
                return 0;
            }
            return this.orderLines.reduce((total, orderLine) => {
                return total + orderLine.product.price * orderLine.quantity;
            }, 0);
        }
    }
}

class Order extends Model {
    static associate(models) {
        this.belongsTo(models.Customer, {
            as: 'customer',
            foreignKey: 'customerId'
        });
        this.hasMany(models.OrderLine, {
            as: 'orderLines',
            foreignKey: 'orderId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_TABLE,
            modelName: 'Order',
            timestamps: false
        }
    }
}

module.exports = {
    Order,
    OrderSchema,
    ORDER_TABLE
}