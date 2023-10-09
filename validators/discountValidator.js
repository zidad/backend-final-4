// imports
const { body } = require('express-validator');

// Discount Validation Rules
const discountValidationRules = () => {
  return [
    body('description', 'name must be string with max characters of 255')
      .isString()
      .notEmpty()
      .isLength({ max: 255 }),
    body(
      'discountPercentage',
      'discountPercentage must be a number between 0 and 100'
    )
      .isFloat({ min: 0, max: 100 })
      .notEmpty(),
  ];
};

// Discount Validation Rules
const discountOptionalRules = () => {
  return [
    body('description', 'name must be string with max characters of 255')
      .optional()
      .isString()
      .notEmpty()
      .isLength({ max: 255 }),
    body(
      'discountPercentage',
      'discountPercentage must be a number between 0 and 100'
    )
      .optional()
      .isFloat({ min: 0, max: 100 })
      .notEmpty(),
  ];
};

// exports
module.exports = {
  rules: discountValidationRules,
  optionalRules: discountOptionalRules,
};
