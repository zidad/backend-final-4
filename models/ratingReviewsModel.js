const DataTypes = require('sequelize');
const sequelize = require('../utils/dataBaseConnection');
const User = require('./userModel');
const Product = require('./productModel');

const RatingReview = sequelize.define('ratingReview', {
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
}, {
    freezeTableName: true,
    timestamps: false,
});

// Associations
RatingReview.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(RatingReview, { foreignKey: 'userId' });

RatingReview.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(RatingReview, { foreignKey: 'productId' });

module.exports = RatingReview;
