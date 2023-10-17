const DataTypes = require('sequelize');
const sequelize = require('../utils/dataBaseConnection');
const User = require('./userModel');
const Product = require('./productModel');

const RatingReview = sequelize.define(
  'ratingReview',
  {
    id: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
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
    rating: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Rating must be an integer',
        },
        min: {
          args: [1],
          msg: 'Rating must be at least 1',
        },
        max: {
          args: [5],
          msg: 'Rating must be at most 5',
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
    productId: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      references: {
        model: Product,
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

// Associations
RatingReview.belongsTo(
  User,
  { onDelete: 'cascade', hooks: true },
  { foreignKey: 'userId' }
);
User.hasMany(RatingReview, { foreignKey: 'userId' });

RatingReview.belongsTo(
  Product,
  { onDelete: 'cascade', hooks: true },
  { foreignKey: 'productId' }
);
Product.hasMany(RatingReview, { foreignKey: 'productId' });

// Hooks
// Add the 'afterCreate' hook for Rating
RatingReview.addHook('afterCreate', async (rating) => {
  // Get the associated product for the rating.
  const product = await rating.getProduct();

  // Update the product's virtual property.
  product.setDataValue('totalRating', product.totalRating + rating.rating);

  // Save the product to persist the change.
  await product.save();
});

module.exports = RatingReview;
