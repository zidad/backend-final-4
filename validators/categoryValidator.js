// imports
const { body } = require('express-validator');

// Address Validation Rules
const categoryValidationRules = () => {
  return [
    body('name', 'name must be string with max characters of 50')
      .isString()
      .notEmpty()
      .isLength({ max: 50 }),
    body('imageUrl', 'imageUrl must be a url with a max of 255 characters')
      .isURL()
      .notEmpty()
      .isLength({ max: 255 }),
    body('isFeatured', 'isFeatured must be a boolean').isBoolean(),
  ];
};

// exports
module.exports = {
  rules: categoryValidationRules,
};
