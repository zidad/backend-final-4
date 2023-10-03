// imports
const DataTypes = require('sequelize');
const sequelize = require('../utils/dataBaseConnection');
const User = require('./userModel');

// Cart Model
const Cart = sequelize.define(
  'cart',
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
    userId: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      references: {
        model: User,
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

// Cart Associations
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User);

// exports
module.exports = Cart;
