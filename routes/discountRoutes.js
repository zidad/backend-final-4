const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validate');
const { discountValidator } = require('../validators');

const {
  getDiscount,
  addDiscount,
  updateDiscount,
  deleteDiscount,
  getDiscounts
} = require('../controllers/discountController');

router.get('/', getDiscounts);
router.get('/:id', getDiscount);
router.post('/', discountValidator.rules(), validate, addDiscount);
router.put('/:id', discountValidator.optionalRules(), validate, updateDiscount);
router.delete('/:id', deleteDiscount);

module.exports = router;
