const express = require('express');
const router = express.Router();

const {
  getBrands,
  getBrand,
  addBrand,
  updateBrand,
  deleteBrand,
} = require('../controllers/brandController');

router.get('/', getBrands);
router.get('/:id', getBrand);
router.post('/', addBrand);
router.put('/:id', updateBrand);
router.delete('/:id', deleteBrand);

module.exports = router;
