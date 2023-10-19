// Import necessary modules and dependencies
const { RatingReview, Product } = require('../models');
const { asyncWrapper } = require('../middleware');
const { createCustomError } = require('../utils/errors/custom-error');

/**
 * Creates a new ratingReview in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const createRatingReview = asyncWrapper(async (req, res, next) => {
  // Destructure required properties from the request body
  const { title, description, rating, userId, productId } = req.body;

  const product = await Product.findByPk(productId);
  const user = await Product.findByPk(userId);

  // Check if the product and user exists
  if (!user) {
    return next(createCustomError(`No user is found`, 404));
  }

  if (!product) {
    return next(createCustomError(`No product is found`, 404));
  }

  // Create a new ratingReview in the database
  const ratingReview = await RatingReview.create({
    title,
    description,
    rating,
    userId,
    productId,
  });

  // update the product total rating and rating count

  await product.addRatingReview(ratingReview);

  // Log the created ratingReview and send a success response
  console.log('Created ratingReview: ', ratingReview);
  res.status(201).json({
    success: true,
    message: 'RatingReview created successfully',
    data: ratingReview,
  });
});

/**
 * Retrieves all ratingReviews from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getRatingReviews = asyncWrapper(async (req, res) => {
  // Fetch all ratingReviews from the database
  const ratingReviews = await RatingReview.findAll();

  // Log the successful retrieval and send a response with the ratingReviews
  console.log('RatingReviews are fetched');
  res.status(200).json({
    success: true,
    message: `RatingReviews fetched successfully`,
    data: ratingReviews,
  });
});

/**
 * Retrieves a single ratingReview by ID from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const getRatingReview = asyncWrapper(async (req, res, next) => {
  // Extract ratingReview ID from request parameters
  const id = Number(req.params.id);

  // Find the ratingReview by ID in the database
  const ratingReview = await RatingReview.findByPk(id);

  // If the ratingReview is found, send a success response; otherwise, invoke the next middleware with a custom error
  if (ratingReview) {
    return res.status(200).json({
      success: true,
      message: `RatingReview fetched successfully`,
      data: ratingReview,
    });
  } else {
    return next(
      createCustomError(`No ratingReview with id: ${id} is found`, 404)
    );
  }
});

/**
 * Updates an ratingReview by ID in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const updateRatingReview = asyncWrapper(async (req, res, next) => {
  // Extract ratingReview ID from request parameters
  const id = Number(req.params.id);

  // Destructure ratingReview properties from the request body
  const { title, description, rating, userId, productId } = req.body;

  const existRatingReview = await RatingReview.findOne({
    where: {
      title, description, rating, userId, productId
    }
  });

  if (existRatingReview) {
    return next(createCustomError('Nothing to update', 200));
  }

  // Update the ratingReview in the database
  const [updatedRowCount] = await RatingReview.update(
    { title, description, rating, userId, productId },
    { where: { id } }
  );

  // If no rows are updated, invoke the next middleware with a custom error; otherwise, fetch the updated ratingReview and send a success response
  if (updatedRowCount === 0) {
    return next(
      createCustomError(`No ratingReview with id: ${id} is found`, 404)
    );
  }

  const updatedRatingReview = await RatingReview.findByPk(id);
  console.log('Updated ratingReview: ', updatedRatingReview);
  res.status(200).json({
    success: true,
    message: `RatingReview updated successfully`,
    data: updatedRatingReview,
  });
});

/**
 * Deletes an ratingReview by ID from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const deleteRatingReview = asyncWrapper(async (req, res, next) => {
  // Extract ratingReview ID from request parameters
  const id = Number(req.params.id);

  // Delete the ratingReview from the database
  const deletedRowCount = await RatingReview.destroy({ where: { id } });

  // If no rows are deleted, invoke the next middleware with a custom error; otherwise, log the deletion and send a success response
  if (deletedRowCount === 0) {
    return next(
      createCustomError(`No ratingReview with id: ${id} is found`, 404)
    );
  }

  console.log('Deleted ratingReview: ', deletedRowCount);
  res.status(200).json({
    success: true,
    message: 'RatingReview deleted successfully',
  });
});

// Export the API functions
module.exports = {
  createRatingReview,
  getRatingReviews,
  getRatingReview,
  updateRatingReview,
  deleteRatingReview,
};
