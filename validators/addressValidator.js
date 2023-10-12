// imports
const { body } = require('express-validator');

// Address Validation Rules
const addressValidationRules = () => {
  return [
    body(
      'street',
      'street must be a non empty string with max limit of 50 character'
    )
      .isString()
      .notEmpty()
      .isLength({ max: 50 }),
    body(
      'postalCode',
      'postalCode must be non empty numeric with 20 digits long'
    )
      .isAlphanumeric()
      .notEmpty()
      .isLength({ max: 20 }),
    body(
      'state',
      'state must be a non empty  string with max limit of 50 character'
    )
      .isString()
      .notEmpty()
      .isLength({ max: 50 }),
    body(
      'city',
      'city must be a non empty  string with max limit of 50 character'
    )
      .isString()
      .notEmpty()
      .isLength({ max: 50 }),
    body(
      'userId',
      'User Id must be non empty  numeric with max limit of 15 digits'
    )
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
  ];
};

// Address Validation Optional Rules
const addressOptionalRules = () => {
  return [
    body(
      'street',
      'street must be a non empty string with max limit of 50 character'
    )
      .optional()
      .isString()
      .notEmpty()
      .isLength({ max: 50 }),
    body(
      'postalCode',
      'postalCode must be non empty numeric with 20 digits long'
    )
      .optional()
      .isAlphanumeric()
      .notEmpty()
      .isLength({ max: 20 }),
    body(
      'state',
      'state must be a non empty  string with max limit of 50 character'
    )
      .optional()
      .isString()
      .notEmpty()
      .isLength({ max: 50 }),
    body(
      'city',
      'city must be a non empty  string with max limit of 50 character'
    )
      .optional()
      .isString()
      .notEmpty()
      .isLength({ max: 50 }),
    body(
      'userId',
      'User Id must be non empty  numeric with max limit of 15 digits'
    )
      .optional()
      .isNumeric()
      .notEmpty()
      .isLength({ max: 15 }),
  ];
};

// exports
module.exports = {
  rules: addressValidationRules,
  optionalRules: addressOptionalRules,
};
