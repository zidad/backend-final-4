const express = require('express');
const router = express.Router();

const {
  fetchCart,
  addItemToCart,
  deleteItemCart,
  deleteAllItemsCart,
} = require('../controllers/cartController');

router.get('/', fetchCart);
router.post('/item', addItemToCart);
router.delete('/item/:id', deleteItemCart);
router.delete('/', deleteAllItemsCart);

module.exports = router;
