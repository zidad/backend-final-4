const express = require('express');
const router = express.Router();
const {
  createWishList,
  fetchWishList,
  addItemToWishList,
  removeItemFromWishList,
  deleteWishList,
  getWishListItems,
} = require('../controllers/wishListController');

router.get('/', fetchWishList);   // origin
router.post('/item', addItemToWishList);  // origin
router.delete('/item', removeItemFromWishList);  // origin
router.delete('/', deleteWishList);  // origin
router.post('/', createWishList);
router.get('/products/:id', getWishListItems);


module.exports = router;
