// imports
const { body } = require('express-validator');

// Address Validation Rules
const paymentValidationRules = () => {
  return [
    body('provider', 'name must be string with max length of 20 characters')
      .isAlpha()
      .notEmpty()
      .isLength({ max: 20 }),
    body('status', 'status must be string with max length of 20 characters')
      .isAlpha()
      .notEmpty()
      .isLength({ max: 20 }),
    body('type', 'name must be string with max length of 20 characters')
      .isString()
      .notEmpty()
      .isLength({ max: 20 }),
  ];
};

// exports
module.exports = {
  rules: paymentValidationRules,
};
