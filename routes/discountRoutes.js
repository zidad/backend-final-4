const express = require('express');
const router = express.Router();

const {
  getDiscount,
  addDiscount,
  updateDiscount,
  deleteDiscount,
} = require('../controllers/discountController');

router.get('/:id', getDiscount);
router.post('/', addDiscount);
router.put('/:id', updateDiscount);
router.delete('/:id', deleteDiscount);

module.exports = router;
