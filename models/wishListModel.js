// imports
const DataTypes = require('sequelize');
const sequelize = require('../utils/dataBaseConnection');
const User = require('./userModel');

const WishList = sequelize.define('wishList', {
    id: {
        type: DataTypes.INTEGER(15),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    }, userId: {
        type: DataTypes.INTEGER(15),
        allowNull: false,
        references: {
            model: User,
            key: 'id',
            onDelete: 'CASCADE',
        },
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

// Associations
User.hasOne(WishList, { foreignKey: 'userId' });
WishList.belongsTo(User, { onDelete: 'cascade', hooks: true });

module.exports = WishList;