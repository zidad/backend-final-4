const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validate');
const { paymentValidator } = require('../validators');

const {
  fetchPayments,
  createPayment,
  getPayment,
  updatePayment,
  deletePayment,
} = require('../controllers/paymentController');

router.get('/', fetchPayments);
router.post('/', paymentValidator.rules(), validate, createPayment);
router.get('/:id', getPayment);
router.put('/:id', paymentValidator.optionalRules(), validate, updatePayment);
router.delete('/:id', deletePayment);

module.exports = router;
