const DataTypes = require('sequelize');
const sequelize = require('../utils/dataBaseConnection');
const Category = require('./categoryModel');
const Brand = require('./brandModel');
const Discount = require('./discountModel');

const Product = sequelize.define(
  'product',
  {
    id: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description cannot be empty',
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: 'Price must be a decimal number',
        },
        min: {
          args: [0.01],
          msg: 'Price must be greater than 0',
        },
      },
    },
    availableInStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: 'Available in stock must be an Integer',
      },
    },
    totalRating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: 'Total rating must be a decimal number',
        },
        min: {
          args: [0],
          msg: 'Total rating must be greater than or equal to 0',
        },
      },
    },
    ratingCount: {
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
    categoryId: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      references: {
        model: Category,
        key: 'id',
        onDelete: 'CASCADE',
      },
    },
    brandId: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      references: {
        model: Brand,
        key: 'id',
        onDelete: 'CASCADE',
      },
    },
    discountId: {
      type: DataTypes.INTEGER(15),
      allowNull: true,
      references: {
        model: Discount,
        key: 'id',
        onDelete: 'CASCADE',
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

// Associations
Product.belongsTo(
  Category,
  { onDelete: 'cascade', hooks: true },
  { foreignKey: 'categoryId' }
);
Category.hasMany(Product, { foreignKey: 'categoryId' });

Product.belongsTo(
  Brand,
  { onDelete: 'cascade', hooks: true },
  { foreignKey: 'brandId' }
);
Brand.hasMany(Product, { foreignKey: 'brandId' });

Product.belongsTo(
  Discount,
  { onDelete: 'cascade', hooks: true },
  { foreignKey: 'discountId' }
);
Discount.hasMany(Product, { foreignKey: 'discountId' });

module.exports = Product;
