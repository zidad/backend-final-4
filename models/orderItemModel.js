// imports
const DataTypes = require('sequelize');
const sequelize = require('../utils/dataBaseConnection');
const Product = require('./productModel');
const Order = require('./orderModel');

// Order Item Model
const OrderItem = sequelize.define('orderItem',
  {
    id: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    price: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: 'Expected decimal number',
        },
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Rating count must be an integer',
        },
        min: {
          args: [0],
          msg: 'Rating count must be greater than or equal to 0',
        },
      },
    },
    productId: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
        onDelete: 'CASCADE',
      },
    },
    orderId: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      references: {
        model: Order,
        key: 'id',
        onDelete: 'CASCADE',
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

//Associations
Order.hasMany(OrderItem, { foreignKeys: 'orderId', });
OrderItem.belongsTo(Order, { onDelete: 'cascade', hooks: true }, { foreignKeys: 'orderId' });

Product.hasMany(OrderItem, { foreignKeys: 'productId', });
OrderItem.belongsTo(Product, { onDelete: 'cascade', hooks: true }, { foreignKeys: 'productId' });

//exports
module.exports = OrderItem;
