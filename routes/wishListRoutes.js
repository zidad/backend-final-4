const express = require('express');
const router = express.Router();
const {
  createWishList,
  fetchWishList,
  addItemToWishList,
  removeItemFromWishList,
  deleteWishListProducts,
  getWishListItems,
} = require('../controllers/wishListController');

router.get('/', fetchWishList);   // origin
router.post('/item', addItemToWishList);  // origin
router.delete('/item', removeItemFromWishList);  // origin
router.delete('/', deleteWishListProducts);  // origin
router.post('/', createWishList);
router.get('/items/:id', getWishListItems);


module.exports = router;
