const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validate');
const { brandValidator } = require('../validators');

const {
  getBrands,
  getBrand,
  addBrand,
  updateBrand,
  deleteBrand,
} = require('../controllers/brandController');

router.get('/', getBrands);
router.get('/:id', getBrand);
router.post('/', brandValidator.rules(), validate, addBrand);
router.put('/:id', updateBrand);
router.delete('/:id', deleteBrand);

module.exports = router;
