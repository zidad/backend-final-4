// imports
const DataTypes = require('sequelize');
const sequelize = require('../utils/dataBaseConnection');
const WishList = require('./wishListModel');
const Product = require('./productModel');

const WishListItem = sequelize.define('wishListItem', {
    id: {
        type: DataTypes.INTEGER(15),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    }, wishListId: {
        type: DataTypes.INTEGER(15),
        allowNull: false,
        references: {
            model: WishList,
            key: 'id',
            onDelete: 'CASCADE',
        },
    },
    productId: {
        type: DataTypes.INTEGER(15),
        allowNull: true,
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
WishListItem.belongsTo(WishList, { onDelete: 'cascade', hooks: true }, { foreignKey: 'wishListId' });
WishList.hasMany(WishListItem, { foreignKey: 'wishListId' });

WishListItem.belongsTo(Product, { onDelete: 'cascade', hooks: true }, { foreignKey: 'productId' });
Product.hasMany(WishListItem, { foreignKey: 'productId' });


module.exports = WishListItem;