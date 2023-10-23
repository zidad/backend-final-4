const { asyncWrapper } = require('../middleware');
const { createCustomError } = require('../utils/errors/custom-error');
const Discount = require('../models/discountModel');
const { ProductService } = require('../services');

/**
 * Fetches all discounts from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const getDiscounts = asyncWrapper(async (req, res) => {
  // Find all discounts in the database
  const discounts = await Discount.findAll();

  // Log the successful retrieval
  console.log('Discounts are fetched');

  // Send a success response with the fetched discounts
  res.status(200).json({
    success: true,
    message: `Discounts successfully fetched`,
    data: discounts,
  });
});

/**
 * Fetches a discount by ID from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const getDiscount = asyncWrapper(async (req, res, next) => {
  // Extract discount ID from request parameters
  const discountId = Number(req.params.id);

  // Find the discount by ID in the database
  const discount = await Discount.findByPk(discountId);

  // If the discount is not found, log and return a custom error
  if (!discount) {
    console.log(`Discount with ID ${discountId} not found`);
    return next(createCustomError(`Discount not found`, 404));
  }

  console.log(`Discount with ID ${discountId} successfully fetched`);

  // If the discount is found, fetch all products associated with the discount
  const { products } = await ProductService.fetchProductsWithCount({
    where: { discountId: discountId },
  });

  // Send a success response with the fetched discount
  res.status(200).json({
    success: true,
    message: `Discount successfully fetched`,
    data: { discount, products },
  });
});

/**
 * Adds a new discount to the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const addDiscount = asyncWrapper(async (req, res, next) => {
  // Destructure properties from the request body
  const { description, discountPercentage } = req.body;

  // Create a new discount in the database
  const newDiscount = await Discount.create({
    description,
    discountPercentage,
  });

  // If there's an error creating the discount, return a custom error
  if (!newDiscount) {
    return next(createCustomError(`Error creating the discount`, 500));
  }

  console.log('Created Discount: ', newDiscount?.description);

  // Send a success response with the newly created discount
  res.status(201).json({
    success: true,
    message: `Discount created successfully`,
    data: newDiscount,
  });
});

/**
 * Updates an existing discount by ID in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const updateDiscount = asyncWrapper(async (req, res, next) => {
  // Extract discount ID from request parameters
  const discountId = req.params.id;

  // Destructure properties from the request body
  const { description, discountPercentage } = req.body;

  // Update the discount in the database
  const updatedRowCount = await Discount.update(
    { description, discountPercentage },
    { where: { id: discountId } }
  );

  // If no rows are updated, throw a custom error
  if (updatedRowCount === 0) {
    return next(
      createCustomError(`No discount with id: ${discountId} is found`, 404)
    );
  }

  const updatedDiscount = await Discount.findByPk(discountId);
  console.log('Updated discount: ', updatedDiscount);

  res.status(200).json({
    success: true,
    message: `Discount updated successfully`,
    data: updatedDiscount,
  });
});

/**
 * Deletes an existing discount by ID from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const deleteDiscount = asyncWrapper(async (req, res, next) => {
  // Extract discount ID from request parameters
  const discountId = req.params.id;

  // Delete the discount from the database
  const deletedRowCount = await Discount.destroy({
    where: { id: discountId },
  });

  // If the discount is not found, throw a custom error
  if (deletedRowCount === 0) {
    return next(
      createCustomError(`No discount with id: ${discountId} is found`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: `Discount deleted successfully`,
  });
});

module.exports = {
  getDiscounts,
  getDiscount,
  addDiscount,
  updateDiscount,
  deleteDiscount,
};
