// imports
const DataTypes = require('sequelize');
const sequelize = require('../utils/dataBaseConnection');
const Product = require('./productModel');
const Cart = require('./cartModel');

// cartItem model
const CartItem = sequelize.define('cartItem', {
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
        msg: 'Quantity count must be an integer',
      },
      min: {
        args: [0],
        msg: 'Quantity count must be greater than or equal to 0',
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
  cartId: {
    type: DataTypes.INTEGER(15),
    allowNull: false,
    references: {
      model: Cart,
      key: 'id',
      onDelete: 'CASCADE',
    },
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

//Associations
Cart.hasMany(CartItem, { foreignKeys: 'cartId' });
CartItem.belongsTo(Cart, { onDelete: 'cascade', hooks: true }, { foreignKeys: 'cartId' });

Product.hasMany(CartItem, { foreignKeys: 'productId' });
CartItem.belongsTo(Product, { onDelete: 'cascade', hooks: true });

//exports
module.exports = CartItem;