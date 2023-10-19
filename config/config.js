const process = require('process');
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    jwt_secret: process.env.JWT_SECRET,
    deliveryFee: 12,
    itemsPerPage: 20,
    newArrivalMonths: 3,
    handPickedRating: 4.5,
    handPickedPrice: 100,
  },
};
