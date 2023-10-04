// imports
const DataTypes = require('sequelize');
const sequelize = require('../utils/dataBaseConnection');

// Order Model
const Payment = sequelize.define(
  'payment',
  {
    id: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    // amount: {
    //   type: DataTypes.DECIMAL(20, 2),
    //   allowNull: false,
    //   validate: {
    //     isDecimal: {
    //       msg: 'Expected decimal number',
    //     },
    //   },
    // },
    provider: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isAlpha: {
          msg: 'provider must only contain letters',
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
    type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isAlpha: {
          msg: 'type must only contain letters',
        },
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

//Payment Associations

// exports
module.exports = Payment;
