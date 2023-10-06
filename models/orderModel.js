// imports
const DataTypes = require('sequelize');
const sequelize = require('../utils/dataBaseConnection');
const Cart = require('./cartModel');
const Address = require('./addressModel');
const Payment = require('./paymentModel');
const User = require('./userModel');

// Order Model
const Order = sequelize.define(
  'order',
  {
    id: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: 'Expected decimal number',
        },
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: {
          msg: 'Invalid date format',
        },
      },
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isAlpha: {
          msg: 'status must only contain letters',
        },
      },
    },
    tax: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: 'Expected decimal number',
        },
      },
    },
    deliveryFee: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: 'Expected decimal number',
        },
      },
    },
    paymentId: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      references: {
        model: Payment,
        key: 'id',
      },
    },
    cartId: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      references: {
        model: Cart,
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      references: {
        model: User,
        key: 'id',
        onDelete: 'CASCADE',
      },
    },
    addressId: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      references: {
        model: Address,
        key: 'id',
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

//Order Associations
Address.hasOne(Order, {
  foreignKey: 'addressId',
});
Order.belongsTo(Address);

User.hasMany(Order, {
  foreignKeys: 'userId',
});
Order.belongsTo(User, {
  foreignKeys: 'userId',
});

Cart.hasMany(Order, {
  foreignKeys: 'cartId',
});
Order.belongsTo(Cart, {
  foreignKeys: 'cartId',
});

Payment.hasMany(Order, {
  foreignKeys: 'paymentId',
});
Order.belongsTo(Payment, {
  foreignKeys: 'paymentId',
});

// exports
module.exports = Order;
