const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validate');
const { addressValidator } = require('../validators');

const {
  createAddress,
  getAddresses,
  getAddress,
  updateAddress,
  deleteAddress,
} = require('../controllers/addressController');

router.get('/', getAddresses);
router.get('/:id', getAddress);
router.post('/', addressValidator.rules(), validate, createAddress);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);

module.exports = router;
