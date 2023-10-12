// imports
const { body } = require('express-validator');

// Review Validation Rules
const reviewValidationRules = () => {
  return [
    body('title', 'title must be string with max length of 255 characters')
      .isString()
      .notEmpty()
      .isLength({ max: 255 }),
    body('description', 'description must be string').isString().notEmpty(),
    body('rating', 'rating must be integer with max length of 15 characters')
      .isInt({ max: 5, min: 1 })
      .notEmpty(),
    body('userId', 'userId must be numeric with max limit of 15 digits')
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
    body('productId', 'productId must be numeric with max limit of 15 digits')
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
  ];
};

// Review Validation Optional Rules
const reviewOptionalRules = () => {
  return [
    body('title', 'title must be string with max length of 255 characters')
      .optional()
      .isString()
      .notEmpty()
      .isLength({ max: 255 }),
    body('description', 'description must be string')
      .optional()
      .isString()
      .notEmpty(),
    body('rating', 'rating must be integer with max length of 15 characters')
      .optional()
      .isInt({ max: 5, min: 1 })
      .notEmpty(),
    body('userId', 'userId must be numeric with max limit of 15 digits')
      .optional()
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
    body('productId', 'productId must be numeric with max limit of 15 digits')
      .optional()
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
  ];
};

// exports
module.exports = {
  rules: reviewValidationRules,
  optionalRules: reviewOptionalRules,
};
