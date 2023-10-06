const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validate');
const { productValidator } = require('../validators');

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductRatingReviews,
} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', productValidator.rules(), validate, createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/v1/search', searchProducts);
router.get('/ratingreviews/:id', getProductRatingReviews);

module.exports = router;
