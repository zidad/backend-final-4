const express = require('express');
const router = express.Router();

const { validate } = require('../middleware/validate');
const { ratingReviewsValidator } = require('../validators');

const {
  createRatingReview,
  getRatingReviews,
  getRatingReview,
  updateRatingReview,
  deleteRatingReview,
} = require('../controllers/ratingReviewController');

router.get('/', getRatingReviews);
router.get('/:id', getRatingReview);
router.post('/', ratingReviewsValidator.rules(), validate, createRatingReview);
router.put('/:id', updateRatingReview);
router.delete('/:id', deleteRatingReview);

module.exports = router;
