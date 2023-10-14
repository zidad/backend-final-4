// imports
const { body, query } = require('express-validator');

// Product Validation Rules
const productValidationRules = () => {
  return [
    body('title', 'name must be string with max length of 50 characters')
      .isString()
      .notEmpty()
      .isLength({ max: 50 }),
    body('description', 'description must be string').isString().notEmpty(),
    body('price', 'Price must be decimal and greater than zero')
      .isDecimal({
        min: 0.01,
      })
      .notEmpty(),
    body(
      'availableInStock',
      'availableInStock must be an integer number not less than 0'
    )
      .isInt({ min: 0 })
      .notEmpty(),
    body('totalRating', 'totalRating must be an number between 0 and 5')
      .isDecimal({ min: 0, max: 5 })
      .notEmpty(),
    body('ratingCount', 'totalRating must be an number between 0 and 5')
      .isNumeric({ min: 0 })
      .notEmpty(),
    body('imageUrl', 'Image url must be a url with max limit of 255 characters')
      .isURL()
      .notEmpty()
      .isLength({ max: 255 }),
    body('categoryId', 'categoryId must be numeric with max limit of 15 digits')
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
    body('brandId', 'brandId must be numeric with max limit of 15 digits')
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
    body('discountId', 'discountId must be numeric with max limit of 15 digits')
      .optional()
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
  ];
};

// Product Validation Optional Rules
const productOptionalRules = () => {
  return [
    body('title', 'name must be string with max length of 50 characters')
      .optional()
      .isString()
      .notEmpty()
      .isLength({ max: 50 }),
    body('description', 'description must be string')
      .optional()
      .isString()
      .notEmpty(),
    body('price', 'Price must be decimal and greater than zero')
      .isDecimal({
        min: 0.01,
      })
      .optional()
      .notEmpty(),
    body(
      'availableInStock',
      'availableInStock must be an integer number not less than 0'
    )
      .optional()
      .isInt({ min: 0 })
      .notEmpty(),
    body('totalRating', 'totalRating must be an number between 0 and 5')
      .optional()
      .isDecimal({ min: 0, max: 5 })
      .notEmpty(),
    body('ratingCount', 'totalRating must be an number between 0 and 5')
      .optional()
      .isNumeric({ min: 0 })
      .notEmpty(),
    body('imageUrl', 'Image url must be a url with max limit of 255 characters')
      .optional()
      .isURL()
      .notEmpty()
      .isLength({ max: 255 }),
    body('categoryId', 'categoryId must be numeric with max limit of 15 digits')
      .optional()
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
    body('brandId', 'brandId must be numeric with max limit of 15 digits')
      .optional()
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
    body('discountId', 'discountId must be numeric with max limit of 15 digits')
      .optional()
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
  ];
};

// Category  query Validation rules
const productQueryRules = () => {
  return [
    query('page', 'page query must be boolean').default(1).isInt(),
    query('newArrival', 'newArrival query must be boolean')
      .optional()
      .default(false)
      .isBoolean(),
    query('handpicked', 'handpicked query must be boolean')
      .optional()
      .default(false)
      .isBoolean(),
  ];
};

// exports
module.exports = {
  rules: productValidationRules,
  optionalRules: productOptionalRules,
  queryRules: productQueryRules,
};
