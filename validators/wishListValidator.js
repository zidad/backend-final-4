// imports
const { body } = require('express-validator');

// wishList Validator
const wishListValidator = () => {
  return [
    body(
      'userId',
      'User Id must be non empty  numeric with max limit of 15 digits'
    )
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
  ];
};

// wishList Validator
const wishListItemValidator = () => {
  return [
    body(
      'userId',
      'User Id must be non empty  numeric with max limit of 15 digits'
    )
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
    body('productId', 'productId must be numeric with max limit of 15 digits')
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
  ];
};

module.exports = {
  rules: wishListValidator,
  itemRules: wishListItemValidator,
};
