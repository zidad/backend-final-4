// imports
const { body } = require('express-validator');

// Address Validation Rules
const userValidationRules = () => {
  return [
    body(
      'firstName',
      'firstName must be string with max length of 25 characters'
    )
      .isAlpha()
      .notEmpty()
      .isLength({ max: 25 }),
    body('lastName', 'lastName must be string with max length of 25 characters')
      .isAlpha()
      .notEmpty()
      .isLength({ max: 25 }),
    body('email', 'email must be in a email format')
      .isEmail()
      .notEmpty()
      .isLength({ max: 50 }),
    body('mobile', 'mobile must be numeric with max length of 20 digits')
      .custom((value) => {
        if (!/^[0-9+\-.]*$/.test(value)) {
          throw new Error('Invalid input');
        }
        return true;
      })
      .notEmpty()
      .isLength({ max: 20 }),
    body(
      'dateOfBirth',
      'dateOfBirth must be numeric with max limit of 15 digits'
    ).isDate(),
    body(
      'password',
      'password must be longer than 8 characters and at least  1 uppercase, 1 symbol, and 1 number'
    )
      .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
      .notEmpty(),
    body('imageUrl', 'Image url must be a url with max limit of 255 characters')
      .isURL()
      .notEmpty()
      .isLength({ max: 255 }),
  ];
};

// exports
module.exports = {
  rules: userValidationRules,
};
