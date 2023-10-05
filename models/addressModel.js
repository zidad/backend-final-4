const DataTypes = require('sequelize');
const sequelize = require('../utils/dataBaseConnection');
const User = require('./userModel');

const Address = sequelize.define('address', {
    id: {
        type: DataTypes.INTEGER(15),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    street: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Street cannot be empty',
            },
        },
    },
    postalCode: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            isNumeric: {
                msg: 'Postal code must only contain numbers',
            },
        },
    },
    state: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'State cannot be empty',
            },
        },
    },
    city: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'City cannot be empty',
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
}, {
    freezeTableName: true,
    timestamps: false,
});

// Associations
Address.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Address, { foreignKey: 'userId' });



module.exports = Address;
