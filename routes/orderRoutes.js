const express = require('express');
const router = express.Router();

const {
  fetchOrders,
  createOrder,
  getOrder,
  cancelOrder,
  // updateOrder,
  // deleteOrder,
} = require('../controllers/orderController');

router.get('/', fetchOrders);
router.post('/', createOrder);
router.get('/:id', getOrder);
router.put('/:id', cancelOrder);
// router.put('/:id', updateOrder);
// router.delete('/:id', deleteOrder);

module.exports = router;