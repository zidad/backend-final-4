// imports
const { body } = require('express-validator');

// Category Validation Rules
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

// Category Validation Optional Rules
const categoryOptionalRules = () => {
  return [
    body('name', 'name must be string with max characters of 50')
      .optional()
      .isString()
      .notEmpty()
      .isLength({ max: 50 }),
    body('imageUrl', 'imageUrl must be a url with a max of 255 characters')
      .optional()
      .isURL()
      .notEmpty()
      .isLength({ max: 255 }),
    body('isFeatured', 'isFeatured must be a boolean').optional().isBoolean(),
  ];
};

// exports
module.exports = {
  rules: categoryValidationRules,
  optional: categoryOptionalRules,
};
