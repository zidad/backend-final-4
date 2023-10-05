// imports
const DataTypes = require('sequelize');
const sequelize = require('../utils/dataBaseConnection');

const Category = sequelize.define('category',
  {
    id: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name cannot be empty',
        },
      },
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Image URL cannot be empty',
        },
        isURL: {
          msg: 'Invalid URL format',
        },
      },
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

//Associations

//exports
module.exports = Category;
