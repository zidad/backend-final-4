const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validate');
const { orderValidator } = require('../validators');

const {
  fetchOrders,
  createOrder,
  getOrder,
  cancelOrder,
  // updateOrder,
  // deleteOrder,
} = require('../controllers/orderController');

router.get('/', fetchOrders);
router.post('/', orderValidator.rules(), validate, createOrder);
router.get('/:id', getOrder);
router.put('/:id', cancelOrder);
// router.put('/:id', updateOrder);
// router.delete('/:id', deleteOrder);

module.exports = router;
