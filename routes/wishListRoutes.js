const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validate');
const { wishListValidator } = require('../validators');
// const { isCustomer, hasAccessToOwnData } = require('../middleware/authMiddleware');
// const passport = require('passport');
// require('../utils/auth/passport');

const {
  createWishList,
  fetchWishList,
  addItemToWishList,
  removeItemFromWishList,
  deleteWishListProducts,
  getWishListItems,
} = require('../controllers/wishListController');

router.get('/', /*passport.authenticate('jwt', { session: false }), hasAccessToOwnData, isCustomer,*/ fetchWishList); // origin
router.post('/item', wishListValidator.itemRules(), validate, addItemToWishList); // origin
router.delete('/item', removeItemFromWishList); // origin
router.delete('/', deleteWishListProducts); // origin
router.post('/', wishListValidator.rules(), validate, createWishList);
router.get('/items/:id', getWishListItems);

module.exports = router;
