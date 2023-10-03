// imports
const DataTypes = require("sequelize");
const sequelize = require("../utils/dataBaseConnection");
const Product = require("./productModel");
const Cart = require("./cartModel");

const CartItem = sequelize.define(
  "cart-item",
  {
    id: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    price: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: "Expected decimal number",
        },
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Rating count must be an integer",
        },
        min: {
          args: [0],
          msg: "Rating count must be greater than or equal to 0",
        },
      },
    },
    productId: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      references: {
        model: Product,
        key: "id",
        onDelete: "CASCADE",
      },
    },
    cartId: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      references: {
        model: Cart,
        key: "id",
        onDelete: "CASCADE",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

//Associations
CartItem.belongsTo(Cart, { foreignKeys: "cartId" });
Cart.hasMany(CartItem, { foreignKeys: "cartId" });
Product.hasMany(CartItem, { foreignKeys: "cartId" });
CartItem.belongsTo(Product);

//exports
module.exports = CartItem;
