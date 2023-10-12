// imports
const { body } = require('express-validator');

// Payment Validation Rules
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

// Payment Validation Optional Rules
const paymentOptionalRules = () => {
  return [
    body('provider', 'name must be string with max length of 20 characters')
      .optional()
      .isAlpha()
      .notEmpty()
      .isLength({ max: 20 }),
    body('status', 'status must be string with max length of 20 characters')
      .optional()
      .isAlpha()
      .notEmpty()
      .isLength({ max: 20 }),
    body('type', 'name must be string with max length of 20 characters')
      .optional()
      .isString()
      .notEmpty()
      .isLength({ max: 20 }),
  ];
};

// exports
module.exports = {
  rules: paymentValidationRules,
  optionalRules: paymentOptionalRules,
};
