// imports
const { body } = require('express-validator');

// Brand Validation Rules
const brandValidationRules = () => {
  return [
    body('name', 'name must be string with max length of 50 characters')
      .isString()
      .notEmpty()
      .isLength({ max: 50 }),
    body('imageUrl', 'Image url must be a url with max limit of 255 characters')
      .isURL()
      .notEmpty()
      .isLength({ max: 255 }),
  ];
};

// Brand Validation Optional Rules
const brandOptionalRules = () => {
  return [
    body('name', 'name must be string with max length of 50 characters')
      .optional()
      .isString()
      .notEmpty()
      .isLength({ max: 50 }),
    body('imageUrl', 'Image url must be a url with max limit of 255 characters')
      .optional()
      .isURL()
      .notEmpty()
      .isLength({ max: 255 }),
  ];
};

// exports
module.exports = {
  rules: brandValidationRules,
  optionalRules: brandOptionalRules,
};
