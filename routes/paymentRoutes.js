const express = require('express');
const router = express.Router();

const {
  fetchPayments,
  createPayment,
  getPayment,
  updatePayment,
  deletePayment,
} = require('../controllers/paymentController');

router.get('/', fetchPayments);
router.post('/', createPayment);
router.get('/:id', getPayment);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);

module.exports = router;
