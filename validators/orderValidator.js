// imports
const { body } = require('express-validator');

// Order Validation Rules
const orderValidationRules = () => {
  return [
    body('userId', 'User Id must be numeric with max limit of 15 digits')
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
    body('cartId', 'Cart Id must be numeric with max limit of 15 digits')
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
    body('status', 'Status must be a alphabetic with max limit of 20 character')
      .isAlpha()
      .isLength({ max: 20 }),
    body('paymentId', 'payment Id must be numeric with max limit of 15 digits')
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
    body('addressId', 'address Id must be numeric with max limit of 15 digits')
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
    body('date', 'Date must be in a date format').isDate(),
  ];
};

// exports
module.exports = {
  rules: orderValidationRules,
};
