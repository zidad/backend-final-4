const express = require('express');
const router = express.Router();

const {
  getBrands,
  getBrand,
  addBrand,
  updateBrand,
  deleteBrand,
} = require('../controllers/brandController');

// Fetch All Brands
router.get('/brands', getBrands);

// Fetch One Brand
router.get('/brands/:id', getBrand);

// Add new Brand
router.post('/brands', addBrand);

// Update Existing Brand
router.put('/brands/:id', updateBrand);

// Delete Existing Brand
router.delete('/brands/:id', deleteBrand);

module.exports = router;
