const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validate');
const { userValidator } = require('../validators');
// const { isAdmin, isCustomer, hasAccessToOwnData } = require('../middleware/authMiddleware');
// const passport = require('passport');
// require('../utils/auth/passport');

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserAddresses,
  getUserRatingReviews,
} = require('../controllers/userController');

router.get('/', /*passport.authenticate('jwt', { session: false }), isAdmin,*/ getUsers);
router.get('/:id', /*passport.authenticate('jwt', { session: false }), hasAccessToOwnData, isCustomer,*/ getUser);
router.post('/', userValidator.rules(), validate, createUser);
router.put('/:id', userValidator.optionalRules(), validate, /* hasAccessToOwnData,*/ updateUser);
router.delete('/:id',/* passport.authenticate('jwt', { session: false }), isAdmin,*/ deleteUser);
router.get('/addresses/:id',/* passport.authenticate('jwt', { session: false }), hasAccessToOwnData,*/ getUserAddresses);
router.get('/ratingreviews/:id', /*passport.authenticate('jwt', { session: false }), hasAccessToOwnData,*/ getUserRatingReviews);


module.exports = router;
