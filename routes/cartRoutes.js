const express = require('express');
const router = express.Router();

const {
  fetchCart,
  addItemToCart,
  updateItemCart,
  deleteItemCart,
  deleteAllItemsCart,
} = require('../controllers/cartController');

router.get('/', fetchCart);
router.post('/item', addItemToCart);
router.put('/item/:id', updateItemCart);
router.delete('/item/:id', deleteItemCart);
router.delete('/', deleteAllItemsCart);

module.exports = router;
