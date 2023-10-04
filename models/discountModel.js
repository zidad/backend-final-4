// imports
const DataTypes = require("sequelize");
const sequelize = require("../utils/dataBaseConnection");

const Discount = sequelize.define(
  "discount",
  {
    id: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description cannot be empty",
        },
      },
    },
    discountPercentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Discount percentage cannot be empty",
        },
        isFloat: {
          msg: "Discount percentage must be a valid number",
        },
        min: {
          args: [0],
          msg: "Discount percentage cannot be negative",
        },
        max: {
          args: [100],
          msg: "Discount percentage cannot exceed 100%",
        },
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

//Associations

//exports
module.exports = Discount;
