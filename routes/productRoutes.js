const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validate');
const { productValidator } = require('../validators');
const { isAdmin } = require('../middleware/authMiddleware');
const passport = require('passport');
require('../utils/auth/passport');


const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductRatingReviews,
} = require('../controllers/productController');

router.get('/', productValidator.queryRules(), validate, getProducts);
router.get('/:id', getProduct);
router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, productValidator.rules(), validate, createProduct);
router.put('/:id', productValidator.optionalRules(), validate, updateProduct);
router.delete('/:id', deleteProduct);
router.get('/v1/search', searchProducts);
router.get('/ratingreviews/:id', getProductRatingReviews);

module.exports = router;
