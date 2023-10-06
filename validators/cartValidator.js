// imports
const { body } = require('express-validator');

// Address Validation Rules
const brandValidationRules = () => {
  return [
    body('productId', 'productId must be numeric with max digits of 15')
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
    body('quantity', 'quantity must be a numeric attribute').isNumeric(),
    body('userId', 'User Id must be numeric with max limit of 15 digits')
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
  ];
};

// exports
module.exports = {
  rules: brandValidationRules,
};
