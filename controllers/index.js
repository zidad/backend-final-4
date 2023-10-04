const productController = require('./productController');
const userController = require('userController');
const cartController = require('cartController');
const addressController = require('./addressController');
const ratingReviewController = require('./ratingReviewController');
const addressController = require('./addressController');
const paymentController = require('paymentController');
const orderController = require('./orderController');


module.exports = {
  productController,
  userController,
  cartController,
  addressController,
  ratingReviewController,
  paymentController,
  orderController,
};
