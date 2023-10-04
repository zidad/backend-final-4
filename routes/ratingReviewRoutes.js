const express = require('express');
const router = express.Router();


const {
    createRatingReview,
    getRatingReviews,
    getRatingReview,
    updateRatingReview,
    deleteRatingReview
} = require('../controllers/ratingReviewController');

router.get('/', getRatingReviews);
router.get('/:id', getRatingReview);
router.post('/', createRatingReview);
router.put('/:id', updateRatingReview);
router.delete('/:id', deleteRatingReview);


module.exports = router;